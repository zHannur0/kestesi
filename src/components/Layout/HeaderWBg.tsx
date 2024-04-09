import { Oswald } from "next/font/google";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

interface HeaderProps {
  isMain?: boolean;
  onClick?: any;
  toMain?: string;
  page?:string
}
const HeaderWBg: FC<HeaderProps> = ({ isMain, onClick, toMain,page }) => {
  const router = useRouter();
  const id = String(router.query.id);
  const handleBack = () => {
    router.push(`/${id}/main`);
  };

  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    if (isMain) {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div
      className={`flex justify-between ${oswald.variable} font-sans mb-[30px] bg-white py-[10px] absolute top-0 z-40 w-full left-0 px-[100px]`}
    >
      {isMain ? (
        <div className="w-[114px] h-[33px] relative">
          <div className="w-[67px] h-[33px] left-0 top-0 absolute text-center text-black text-[27px] font-bold">
            {time && time.getHours() < 10
              ? "0" + time?.getHours()
              : time?.getHours()}
            :
            {time && time.getMinutes() < 10
              ? "0" + time?.getMinutes()
              : time?.getMinutes()}
          </div>
          <div className="w-10 h-[31px] left-[74px] top-[3px] absolute">
            <div className="left-0 top-0 absolute text-center text-black text-sm font-normal leading-[18px]">
              {time && weekDay[time.getDay() - 1]}
            </div>
            <div className="w-10 h-[15px] left-0 top-[16px] absolute justify-start items-start gap-[3px] inline-flex">
              <div className="text-center text-zinc-500 text-[10px] font-normal ">
                {time?.getDate()}
              </div>
              <div className="text-center text-zinc-500 text-[10px] font-normal ">
                {time && months[time.getMonth()]}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={"flex gap-[20px]"}>
          <div className={"hover:cursor-pointer"} onClick={onClick}>
            <img src="/images/back.svg" alt="" />
          </div>
          <div
            className={"flex flex-col items-start justify-center text-center"}
          >
            <div className={"text-[14px] font-bold"}>назад</div>
            <div className={"text-[10px] font-normal text-[#7B7984]"}>
              {toMain}
            </div>
          </div>
        </div>
      )}
      <div
        className={"w-[134.42px] h-[50px] hover:cursor-pointer"}
        onClick={handleBack}
      >
        <img className="w-[100%] h-[50px]" src="/images/Logo.svg" alt="" />
      </div>
      <div className="w-[116px] h-[40px] justify-start items-start gap-[18px] inline-flex">
        <Link href={page || `/${id}/main`}  locale="kz">
          <div className="text-center text-neutral-800 text-[27px] font-normal">
            KZ
          </div>
        </Link>
        <Link href={page || `/${id}/main`} locale="ru">
          <div className="text-center text-zinc-500 text-[27px] font-normal">
            RU
          </div>
        </Link>
        <Link href={page || `/${id}/main`}  locale="en">
          <div className="text-center text-zinc-500 text-[27px] font-normal">
            EN
          </div>
        </Link>
      </div>
    </div>
  );
};

const weekDay = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
];
const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "май",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export default HeaderWBg;
