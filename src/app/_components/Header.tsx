import Image, { type StaticImageData } from "next/image";
import search from "../../../public/assets/search.svg";
import cart from "../../../public/assets/cart.svg";
import leftArrow from "../../../public/assets/left-arrow.svg";
import rightArrow from "../../../public/assets/right-arrow.svg";

const searchImage: StaticImageData = search;
const cartImage: StaticImageData = cart;
const leftArrowImage: StaticImageData = leftArrow;
const rightArrowImage: StaticImageData = rightArrow;

export default function Header() {
  return (
    <>
      <header className="px-10">
        <div className="flex items-center justify-end gap-4 py-3 text-xs text-[#333333]">
          <span>Help</span>
          <span>Orders & Returns</span>
          <span>Hi, John</span>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-[32px] font-bold">ECOMMERCE</span>
          </div>
          <nav className="flex items-center gap-8 font-semibold">
            <span>Categories</span>
            <span>Sale</span>
            <span>Clearance</span>
            <span>New stock</span>
            <span>Trending</span>
          </nav>
          <div className="flex items-center gap-8">
            <Image src={searchImage} alt="search" />
            <Image src={cartImage} alt="cart" />
          </div>
        </div>
      </header>
      <div className="font-sm flex justify-center gap-8 bg-[#f4f4f4] py-2">
        <Image src={leftArrowImage} alt="left-arrow" />
        <span>Get 10% off on business sign up</span>
        <Image src={rightArrowImage} alt="right-arrow" />
      </div>
    </>
  );
}
