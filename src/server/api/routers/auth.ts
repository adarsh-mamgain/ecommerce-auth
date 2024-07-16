import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { env } from "~/env";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Generate OTP
      const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
      await ctx.db.oTP.create({
        data: {
          code: otp,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
          userId: user.id,
        },
      });

      return {
        message: "User created successfully. Please verify your email.",
        otp,
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      // Find user
      const user = await ctx.db.user.findUnique({ where: { email } });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      // Check if user is verified
      if (!user.verified) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please verify your email before logging in",
        });
      }

      // Generate JWT
      const secret = new TextEncoder().encode(env.JWT_SECRET);
      const token = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secret);

      return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      };
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string().length(8),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, otp } = input;

      // Find user
      const user = await ctx.db.user.findUnique({ where: { email } });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Find OTP
      const otpRecord = await ctx.db.oTP.findFirst({
        where: {
          userId: user.id,
          code: otp,
          expiresAt: { gt: new Date() },
        },
      });

      if (!otpRecord) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired OTP",
        });
      }

      // Verify user
      await ctx.db.user.update({
        where: { id: user.id },
        data: { verified: true },
      });

      // Delete OTP
      await ctx.db.oTP.delete({ where: { id: otpRecord.id } });

      return { message: "Email verified successfully" };
    }),

  verifyToken: publicProcedure.mutation(async ({ ctx }) => {
    const authHeader = ctx.headers.get("authorization");
    if (!authHeader) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1] as string;
    try {
      const secret = new TextEncoder().encode(env.JWT_SECRET);
      await jwtVerify(token, secret);
      return { valid: true };
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }
  }),
});
