import { IDopSchedule, IMenu, ISchedule } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";

interface IProps {
  item: IMenu;
  index: number;
  dayNumber: number;
}

const MenuCardComponent: FC<IProps> = ({ item, index, dayNumber }) => {
  const [time, setTime] = useState<Date>(new Date());

  return (
    <div
      key={item.id}
      className={
        "w-[870px] rounded-[20px] bg-[#F9F8FD] flex pt-[20px] pb-[30px] px-[30px] max-sm:h-auto max-sm:w-full " +
          " max-sm:py-[15px] max-sm:px-[20px] vr:w-full"
      }
    >
      <div className={" h-[100%] flex flex-col gap-[20px] w-[100%]"}>
        <div
          className={
            "text-[#211F23] text-2xl leading-[85%] font-bold max-sm:text-lg vr:text-[40px]"
          }
        >
          {item.food_name}
        </div>
        <div
          className={
            "flex justify-between text-[#7B7984] text-[18px] max-sm:text-[14px] leading-none vr:text-[40px]"
          }
        >
          <div className={"w-[60%]"}>{item.food_sostav}</div>
          <div className={"w-[40%] flex justify-end"}>
            {item.vihod_1} гр, {item.vihod_2} гр, {item.vihod_3} гр
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCardComponent;
