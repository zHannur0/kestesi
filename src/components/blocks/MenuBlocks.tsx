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
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const MenuBlocks = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  const [day, setDay] = useState<number>(1);
  const menus = useTypedSelector((state) => state.schoolInfo.menus);
  const [currMenu, setCurrMenu] = useState<IMenu[]>([]);
  const [weekDays, setWeekDays] = useState<any[]>();
  useEffect(() => {
    if (router.isReady && id) {
      dispatch(getMenuThunk(id));
    }
  }, [router.isReady, dispatch, id]);

  useEffect(() => {
    let arr = menus?.filter((item) => Number(item.week_day) === day);
    setCurrMenu(arr);
  }, [day, menus]);

  useEffect(() => {
    let time = new Date();
    setDay(time.getDay());
  }, []);

  useEffect(() => {
    console.log()
    const getLocalizedWeekdays =()=>{
      return [
        { id: 1, type: t.menu.Monday, short: t.menu.Mon },
        { id: 2, type: t.menu.Tuesday, short: t.menu.Tue },
        { id: 3, type: t.menu.Wednesday, short: t.menu.Wen },
        { id: 4, type: t.menu.Thursday, short: t.menu.Thu },
        { id: 5, type: t.menu.Friday, short: t.menu.Fri },
        { id: 6, type: t.menu.Saturday, short: t.menu.Sat },
      ];
    }
    setWeekDays(getLocalizedWeekdays);
  }, [t]);

  return (
    <div className={"flex gap-[20px]"}>
      {weekDays?.map((item) =>
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

// const weekdays = [
//   {
//     id: 1,
//     type: "Понедельник",
//     short: "Пн",
//   },
//
//   {
//     id: 2,
//     type: "Вторник",
//     short: "Вт",
//   },
//
//   {
//     id: 3,
//     type: "Среда",
//     short: "Ср",
//   },
//
//   {
//     id: 4,
//     type: "Четверг",
//     short: "Чт",
//   },
//
//   {
//     id: 5,
//     type: "Пятница",
//     short: "Пт",
//   },
//
//   {
//     id: 6,
//     type: "Суббота",
//     short: "Сб",
//   },
// ];

export default MenuBlocks;
