import {IDopSchedule, ISchedule} from "@/types/assets.type";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getDopScheduleThunk, getScheduleThunk} from "@/store/thunks/school.thunk";
import ScheduleCard from "@/components/cards/ScheduleCard";
import {it} from "node:test";

const Schedule = () =>{
    const router = useRouter();
    const id=Number(router.query.id);
    const classId = Number(router.query.scheduleId);
    const dispatch = useAppDispatch();
    const os = useTypedSelector((state) => state.schoolInfo.osSchedule);
    const dop = useTypedSelector((state) => state.schoolInfo.dopSchedule);
    const[day, setDay] = useState<number>(1);
    const[currSchedule, setCurrSchedule] = useState<ISchedule[]>([]);
    const[currDopSchedule, setCurrDopSchedule] = useState<IDopSchedule[]>([]);

    useEffect(() => {
        id && dispatch(getScheduleThunk(id));
        id && dispatch(getDopScheduleThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(os && dop) {
            let arr1 = os.filter((item) => Number(item.week_day) === day && item.classl?.id === classId).sort((a,b) => {
                const timeA = new Date(`2000-01-01 ${a.ring?.start_time}`);
                const timeB = new Date(`2000-01-01 ${b.ring?.start_time}`);

                return timeA.getTime() - timeB.getTime();
            });
            let arr2 = dop.filter((item) => Number(item.week_day) === day && item.classl?.id === classId).sort((a,b) => {
                const timeA = new Date(`2000-01-01 ${a.ring?.start_time}`);
                const timeB = new Date(`2000-01-01 ${b.ring?.start_time}`);

                return timeA.getTime() - timeB.getTime();
            });
            setCurrSchedule(arr1);
            setCurrDopSchedule(arr2);
        }
    }, [day, os, dop]);

    useEffect(() => {
        let time = new Date();
        setDay(time.getDay());
    }, []);


    return(
        <div className={"flex gap-[20px]"}>
            {weekdays.map((item) => (
                item.id !== day ? (
                    <div key={item.id} onClick={() => setDay(item.id)} className={"flex w-[132px] h-[132px] items-center justify-center rounded-[40px] bg-white text-[32px] font-bold leading-[71%] text-[#524FA2]"}>
                        {item.short}
                    </div>
                ) : (
                    <ScheduleCard key={item.id} os={currSchedule} dop={currDopSchedule} day={item.type} dayNumber={day}/>
                )
            ))}
        </div>
    )
}

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

export default Schedule;


