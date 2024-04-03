import { IDopSchedule, ISchedule } from "@/types/assets.type";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import {
  getClassroomScheduleThunk,
  getClassScheduleThunk,
  getDopScheduleThunk,
  getScheduleThunk, getTeacherScheduleThunk,
} from "@/store/thunks/school.thunk";
import ScheduleCard from "@/components/cards/ScheduleCard";
import { it } from "node:test";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const Schedule = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const classId = Number(router.query.scheduleId);
  const who = router.query.which;
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  const os = useTypedSelector((state) => who === "teacher" ? state.schoolInfo.scheduleTeacher :
      who === "classroom" ? state.schoolInfo.scheduleClassroom : state.schoolInfo.scheduleClass);
  console.log(os)
  const dop = useTypedSelector((state) => state.schoolInfo.dopSchedule);
  const [day, setDay] = useState<number>(1);
  const [currSchedule, setCurrSchedule] = useState<ISchedule[]>([]);
  const [currDopSchedule, setCurrDopSchedule] = useState<IDopSchedule[]>([]);
  const [weekDays, setWeekDays] = useState<any[]>();
  useEffect(() => {
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
  useEffect(() => {
    if(id) {
      if (who === "teacher") {
        dispatch(getTeacherScheduleThunk({id: id, teacherId: classId}));
      } else if (who === "classroom") {
        dispatch(getClassroomScheduleThunk({id: id, classroomId: classId}));
      } else {
        dispatch(getClassScheduleThunk({id: id, classId: classId}));
      }
    }
    id && dispatch(getDopScheduleThunk(id));
  }, [dispatch, id, who]);


  useEffect(() => {
    if (os && dop) {
      let arr1 = os
        .filter(
          (item) => {
            if(who === "class")
            return Number(item.week_day) === day && item.classl?.id === classId;
            else if(who === "teacher")
              return Number(item.week_day) === day && (item.teacher?.id === classId || item.teacher2?.id === classId );
              else
              return Number(item.week_day) === day && (item.classroom?.id === classId || item.classroom2?.id === classId );
          },
        )
        .sort((a, b) => {
          const timeA = new Date(`2000-01-01 ${a.ring?.start_time}`);
          const timeB = new Date(`2000-01-01 ${b.ring?.start_time}`);

          return timeA.getTime() - timeB.getTime();
        });
      let arr2 = dop
        .filter(
          (item) =>
            Number(item.week_day) === day && item.classl?.id === classId,
        )
        .sort((a, b) => {
          const timeA = new Date(`2000-01-01 ${a.ring?.start_time}`);
          const timeB = new Date(`2000-01-01 ${b.ring?.start_time}`);

          return timeA.getTime() - timeB.getTime();
        });
      setCurrSchedule(arr1);
      setCurrDopSchedule(arr2);
    }
  }, [day, os, dop, classId, who]);

  useEffect(() => {
    let time = new Date();
    setDay(time.getDay());
  }, []);

  return (
    <div className={"flex gap-[20px]"}>
      {weekDays?.map((item) =>
        item.id !== day ? (
          <div
            key={item.id}
            onClick={() => setDay(item.id)}
            className={
              "flex w-[132px] cursor-pointer h-[132px] items-center justify-center rounded-[40px] bg-white text-[32px] font-bold leading-[71%] text-[#524FA2]"
            }
          >
            {item.short}
          </div>
        ) : (
          <ScheduleCard
            key={item.id}
            os={currSchedule}
            dop={currDopSchedule}
            day={item.type}
            dayNumber={day}
          />
        ),
      )}
    </div>
  );
};

export default Schedule;
