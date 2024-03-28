import { FC, useEffect, useState } from "react";
import { IDopSchedule, IMenu, ISchedule } from "@/types/assets.type";
import { allowedDisplayValues } from "next/dist/compiled/@next/font/dist/constants";
import ScheduleCardContent from "@/components/cards/ScheduleCardContent";
import MenuCardContent from "@/components/cards/MenuCardContent";

interface IProps {
  menu: IMenu[];
  day: string;
  dayNumber: number;
}

const ScheduleCards: FC<IProps> = ({ menu, day, dayNumber }) => {
  const [time, setTime] = useState<Date>(new Date());

  return (
    <div
      className={
        "flex flex-col gap-[30px] bg-[#fff] w-[960px] max-h-[852px] px-[45px] py-[53px] rounded-[40px]"
      }
    >
      <div className={"flex justify-between items-center"}>
        <div className={"text-[32px] font-bold leading-[71%] text-[#211F23]"}>
          {day}
        </div>
        {time?.getDay() === dayNumber && (
          <div
            className={
              "text-right text-[18px] font-bold leading-[85%] text-[#ED008C]"
            }
          >
            Сегодня
          </div>
        )}
      </div>
      <div
        className={
          "flex flex-col gap-[20px] max-h-[690px] overflow-auto scrollbar-hide"
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
    </div>
  );
};

export default ScheduleCards;
