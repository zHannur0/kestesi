import { Oswald } from "next/font/google";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

interface HeaderProps {
  isMain?: boolean;
  onClick?: any;
  toMain?: string;
  page?:string;
  back?: boolean;
}
const Header: FC<HeaderProps> = ({ isMain, onClick, toMain,page,back}) => {
  const router = useRouter();
  const id = String(router.query.id);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const handleBack = () => {
    router.push(`/${id}`);
  };
  const [locale,setLocal] = useState<string>(String(router.locale));

  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    if (isMain) {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const localeKey = router.locale as 'ru' | 'kz' | 'en';

  const localeSetter = () =>{
    if(locale === "kz") setLocal("ru");
    else if(locale === "ru") setLocal("en");
    else if(locale === "eng") setLocal("kz")
  }

  return (
      <div
          className={`flex relative justify-between ${oswald.variable} font-sans mb-[30px] max-sm:justify-center vr:justify-center  vr:mb-[60px]`}
      >
        {isMain ? (
            <div className="w-[114px] h-[33px] relative max-sm:hidden vr:hidden">
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
                  {time && weekDay[time.getDay() - 1]?.[localeKey || "kz"]}
                </div>
                <div
                    className="w-10 h-[15px] left-0 top-[16px] absolute justify-start items-start gap-[3px] inline-flex">
                  <div className="text-center text-zinc-500 text-[10px] font-normal ">
                    {time?.getDate()}
                  </div>
                  <div className="text-center text-zinc-500 text-[10px] font-normal ">
                    {time && months[time.getMonth()]?.[localeKey || "kz"]}
                  </div>
                </div>
              </div>
            </div>
        ) : (
            <div className={"flex gap-[20px] max-sm:absolute max-sm:left-[0px] vr:absolute vr:left-[0px]"}>
              <div className={"hover:cursor-pointer"} onClick={!back ? onClick : () => router.back()}>
                <img src="/images/back.svg" alt="" className={"vr:w-[80px] vr:h-[80px]"}/>
              </div>
              <div
                  className={"flex flex-col items-start justify-center text-center max-sm:hidden vr:hidden"}
              >
                <div className={"text-[14px] font-bold"}>{t.contacts.back}</div>
                <div className={"text-[10px] font-normal text-[#7B7984]"}>
                  {toMain}
                </div>
              </div>
            </div>
        )}
        <div
            className={"w-[134.42px] h-[50px] vr:h-[80px] vr:w-[250px] hover:cursor-pointer"}
            onClick={handleBack}
        >
          <img className="w-[100%] h-[50px] vr:h-[80px]" src="/images/Logo.svg" alt=""/>
        </div>
        <div
            className="w-[116px] h-[40px] justify-start items-start gap-[18px] inline-flex max-sm:hidden max-sm:absolute max-sm:right-[0px] vr:hidden vr:absolute vr:right-[0px]">
          <Link href={page || `/${id}`} locale="kz">
            <div className={`text-center text-[27px] font-normal ${router.locale === "kz" ? "icon-container" : ""}`}
                 style={{
                   color: router.locale === "kz" ? "#211F23" : "#7B7984",
                 }}>
              KZ
            </div>
          </Link>
          <Link href={page || `/${id}`} locale="ru">
            <div className={`text-center text-[27px] font-normal ${router.locale === "ru" ? "icon-container" : ""}`}
                 style={{
                   color: router.locale === "ru" ? "#211F23" : "#7B7984",
                 }}>
              RU
            </div>
          </Link>
          <Link href={page || `/${id}`} locale="en">
              <div className={`text-center text-[27px] font-normal ${router.locale === "en" ? "icon-container" : ""}`}
                 style={{
                   color: router.locale === "en" ? "#211F23" : "#7B7984",
                 }}>
              EN
            </div>
          </Link>
        </div>
        <div
            className="sm:hidden max-sm:absolute max-sm:right-[0px] vr:absolute vr:block vr:right-[0px] flex h-full">
          <Link href={page || `/${id}`} locale={router.locale === "kz" ? "ru" : router.locale === "ru" ? "en" : "kz"}>
            <div className="text-center text-[27px] font-normal cursor-pointer icon-container vr:text-[40px] "
                 style={{
                   color: "#211F23" ,
                 }}>
              {router.locale?.toUpperCase()}
            </div>
          </Link>
        </div>
      </div>
  );
};

const weekDay = [
  {ru: "понедельник", kz: "дүйсенбі", en: "monday"},
  {ru: "вторник", kz: "сейсенбі", en: "tuesday"},
  {ru: "среда", kz: "сәрсенбі", en: "wednesday"},
  {ru: "четверг", kz: "бейсенбі", en: "thursday"},
  {ru: "пятница", kz: "жұма", en: "friday"},
  {ru: "суббота", kz: "сенбі", en: "saturday"},
  {ru: "воскресенье", kz: "жексенбі", en: "sunday"},
];

const months = [
  {ru: "января", kz: "қаңтар", en: "january"},
  {ru: "февраля", kz: "ақпан", en: "february"},
  {ru: "марта", kz: "наурыз", en: "march"},
  {ru: "апреля", kz: "сәуір", en: "april"},
  {ru: "май", kz: "мамыр", en: "may"},
  {ru: "июня", kz: "маусым", en: "june"},
  {ru: "июля", kz: "шілде", en: "july"},
  {ru: "августа", kz: "тамыз", en: "august"},
  {ru: "сентября", kz: "қыркүйек", en: "september"},
  {ru: "октября", kz: "қазан", en: "october"},
  {ru: "ноября", kz: "қараша", en: "november"},
  {ru: "декабря", kz: "желтоқсан", en: "december"},
];


export default Header;
