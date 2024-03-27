import { IDopSchedule, IMenu, ISchedule } from "@/types/assets.type";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import {
  getDopScheduleThunk,
  getMenuThunk,
  getScheduleThunk,
} from "@/store/thunks/school.thunk";
import ScheduleCard from "@/components/cards/ScheduleCard";
import { it } from "node:test";
import MenuCard from "@/components/cards/MenuCard";

const MenuBlocks = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const dispatch = useAppDispatch();
  const [day, setDay] = useState<number>(1);
  const menus = useTypedSelector((state) => state.schoolInfo.menus);
  const [currMenu, setCurrMenu] = useState<IMenu[]>([]);
  useEffect(() => {
    id && dispatch(getMenuThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    let arr = menus?.filter((item) => Number(item.week_day) === day);
    setCurrMenu(arr);
  }, [day, menus]);

  useEffect(() => {
    let time = new Date();
    setDay(time.getDay());
  }, []);

  return (
    <div className={"flex gap-[20px]"}>
      {weekdays.map((item) =>
        item.id !== day ? (
          <div
            key={item.id}
            onClick={() => setDay(item.id)}
            className={
              "flex w-[132px] h-[132px] items-center justify-center rounded-[40px] bg-white text-[32px] font-bold leading-[71%] text-[#524FA2]"
            }
          >
            {item.short}
          </div>
        ) : (
          <MenuCard
            key={item.id}
            menu={currMenu}
            day={item.type}
            dayNumber={day}
          />
        ),
      )}
    </div>
  );
};

const weekdays = [
  {
    id: 1,
    type: "Понедельник",
    short: "Пн",
  },

  {
    id: 2,
    type: "Вторник",
    short: "Вт",
  },

  {
    id: 3,
    type: "Среда",
    short: "Ср",
  },

  {
    id: 4,
    type: "Четверг",
    short: "Чт",
  },

  {
    id: 5,
    type: "Пятница",
    short: "Пт",
  },

  {
    id: 6,
    type: "Суббота",
    short: "Сб",
  },
];

export default MenuBlocks;
