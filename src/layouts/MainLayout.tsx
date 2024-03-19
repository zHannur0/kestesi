import {ReactNode, useEffect, useState} from "react";
import { useRouter } from "next/router";
import Header from "@/components/Layout/Header";

import { Oswald } from 'next/font/google'

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
})
interface ILayouts {
    children: ReactNode;
    handleClick?: any;
    isMain?: boolean;
    link?:string;
}

const MainLayout = ({ children, handleClick, isMain, link }: ILayouts) => {
    const router = useRouter();
    return (
        <div className={`w-[1920px] relative min-h-[1080px] bg-cover bg-no-repeat px-[100px] py-[30px] ${oswald.variable} font-sans`} style={{background: "url('/images/bg.svg')"}}
        >
            <Header onClick={handleClick} isMain={isMain} toMain={link}/>
            <div>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
