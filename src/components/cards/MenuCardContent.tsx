import { IDopSchedule, IMenu, ISchedule } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";

interface IProps {
  item: IMenu;
  index: number;
  dayNumber: number;
}

const ScheduleCardComponent: FC<IProps> = ({ item, index, dayNumber }) => {
  const [time, setTime] = useState<Date>(new Date());

  return (
    <div
      key={item.id}
      className={
        "w-[870px] rounded-[20px] bg-[#F9F8FD] flex h-[100px] pt-[20px] pb-[30px] px-[30px]"
      }
    >
      <div className={" h-[100%] flex flex-col gap-[20px] w-[100%]"}>
        <div
          className={
            "text-[#211F23] text-2xl leading-[85%] font-bold"
          }
        >
          {item.food_name}
        </div>
        <div
          className={
            "flex justify-between text-[#7B7984] text-[18px] leading-[26%]"
          }
        >
          <div className={""}>{item.food_sostav}</div>
          <div className={""}>
            Выход: {item.vihod_1} гр, {item.vihod_2} гр, {item.vihod_3} гр
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCardComponent;
