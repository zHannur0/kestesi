import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Layout/Header";

import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});
interface ILayouts {
  children: ReactNode;
  handleClick?: any;
  isMain?: boolean;
  link?: string;
  page?:string;
  bg?:string;
  back?:boolean;
}

const MainLayout = ({ children, handleClick, isMain, link, page,bg, back}: ILayouts) => {
  const router = useRouter();
  return (
    <div
      className={`w-[1920px] relative h-[1080px] bg-cover bg-no-repeat px-[100px] py-[30px] ${oswald.variable} font-sans
      max-sm:w-full max-sm:p-[10px] vr:w-full vr:p-[10px] overflow-auto scrollbar-hide`}
      style={{ background: bg ? `url('/images/${bg}.svg')` : "url('/images/bg.svg')" }}
    >
      <Header onClick={handleClick} isMain={isMain} toMain={link} page={page} back={back}/>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
