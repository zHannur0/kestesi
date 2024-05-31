import { FC, useEffect, useState } from "react";
import { IDopSchedule, IMenu, ISchedule } from "@/types/assets.type";
import { allowedDisplayValues } from "next/dist/compiled/@next/font/dist/constants";
import ScheduleCardContent from "@/components/cards/ScheduleCardContent";
import MenuCardContent from "@/components/cards/MenuCardContent";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

interface IProps {
  menu: IMenu[];
  day: string;
  dayNumber: number;
}

const MenuCard: FC<IProps> = ({ menu, day, dayNumber }) => {
  const [time, setTime] = useState<Date>(new Date());
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  return (
    <div
      className={
        "flex flex-col gap-[30px] bg-[#fff] w-[960px] max-h-[852px] px-[45px] py-[53px] rounded-[40px]" +
          " max-sm:w-full max-sm:h-[440px] max-sm:p-[20px] vr:w-full vr:h-[1200px]"
      }
    >
      <div className={"flex justify-between items-center"}>
        <div className={"text-[32px] font-bold leading-[71%] text-[#211F23] max-sm:text-2xl vr:text-[50px]"}>
          {day}
        </div>
        {time?.getDay() === dayNumber && (
          <div
            className={
              "text-right text-[18px] font-bold leading-[85%] text-[#ED008C] max-sm:text-lg"
            }
          >
            {t.menu.today}
          </div>
        )}
      </div>
      {
        menu && menu.length > 0 ? (
            <div
                className={
                  "flex flex-col gap-[20px] max-h-[690px] overflow-auto scrollbar-hide max-sm:gap-[10px]"
                }
            >
              {menu.map((item, index) => (
                  <MenuCardContent
                      key={item.id}
                      dayNumber={dayNumber}
                      index={index}
                      item={item}
                  />
              ))}
            </div>
        ) : (
            <div className={"flex items-center justify-center text-[#7B7984] text-[30px] leading-[71%] h-[700px]"}>
              {t.menu.noMenu}
            </div>
        )
      }

    </div>
  );
};

export default MenuCard;
