import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1),
          pageSize: z.number().min(1).max(100).default(6),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      const { page = 1, pageSize = 6 } = input ?? {};
      const skip = (page - 1) * pageSize;

      const [categories, totalCount] = await Promise.all([
        ctx.db.category.findMany({
          take: pageSize,
          skip,
          include: {
            users: {
              where: { userId: ctx.user.id },
            },
          },
        }),
        ctx.db.category.count(),
      ]);

      return {
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          selected: category.users.length > 0,
        })),
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      };
    }),

  updateUserCategory: protectedProcedure
    .input(
      z.object({
        categoryId: z.number(),
        selected: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { categoryId, selected } = input;

      if (selected) {
        await ctx.db.userCategory.create({
          data: {
            userId: ctx.user.id,
            categoryId,
          },
        });
      } else {
        await ctx.db.userCategory.deleteMany({
          where: {
            userId: ctx.user.id,
            categoryId,
          },
        });
      }

      return { success: true };
    }),
});
