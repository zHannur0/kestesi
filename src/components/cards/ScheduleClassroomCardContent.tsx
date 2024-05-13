import { IDopSchedule, ISchedule } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {getClassroomThunk} from "@/store/thunks/school.thunk";
import Link from "next/link";

interface IProps {
    item: ISchedule;
    index: number;
    dayNumber: number;
    classroom?:string;
}

const ScheduleClassroomCardComponent: FC<IProps> = ({ item, index, dayNumber }) => {
    const router = useRouter();
    const classId = Number(router.query.scheduleId);
    const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const getInitials = (fullName?: string) => {
        if (!fullName) return "";

        const parts = fullName.split(" ");
        if (parts.length === 0) return "";

        let initials = parts[0]; // Always add the first part
        if (parts.length > 1) {
            initials += ` ${parts[1][0]}.`; // Add the first initial of the second part, if exists
        }
        if (parts.length > 2) {
            initials += ` ${parts[2][0]}.`; // Add the first initial of the third part, if exists
        }

        return initials;
    };


    function removeSecondOfTime(time?: string): string {
        if (!time) {
            return "";
        }
        const splitTime: string[] = time.split(":");
        const removeSeconds: string = splitTime.slice(0, 2).join(":");
        return removeSeconds;
    }

    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    function createTime(date: Date, time: string) {
        const [hours, minutes] = time.split(":").map(Number);
        date.setHours(hours, minutes, 0, 0);
        return new Date(date);
    }

    function isCurrentTimeWithinLesson(
        startTimeStr?: string,
        endTimeStr?: string,
    ) {
        const startTime = createTime(new Date(time), startTimeStr || "");
        const endTime = createTime(new Date(time), endTimeStr || "");
        return time?.getDay() === dayNumber && time >= startTime && time <= endTime;
    }

    return (
        <div
            key={item.id}
            className={"w-full rounded-[20px] bg-[#F9F8FD] flex max-sm:rounded-[10px] max-sm:flex-col"}
        >
            <div
                style={{
                    backgroundColor: isCurrentTimeWithinLesson(
                        item.ring?.start_time,
                        item.ring?.end_time,
                    )
                        ? "#ED008C"
                        : "#7B7984",
                }}
                className={
                    "w-[100px] flex flex-col items-center pt-[23px] gap-[20px] pb-[24px] rounded-l-[20px] " +
                    " max-sm:w-full max-sm:h-[35px] max-sm:rounded-l-none max-sm:rounded-t-[10px] max-sm:flex-row max-sm:py-0 max-sm:px-[20px]"
                }
            >
                <div className={"text-white text-2xl leading-[85%] font-bold max-sm:text-[14px]"}>
                    {removeSecondOfTime(item.ring?.start_time)}
                </div>
                <div className={"text-white text-[18px] leading-[26%] font-normal max-sm:text-[14px]"}>
                    {index + 1 + " " + t.schedule.lesson}
                </div>
            </div>
            <div
                className={
                    "pt-[23px] pb-[24px] pr-[50px] pl-[23px] h-[100%] flex flex-col gap-[20px] w-[100%]" +
                    " max-sm:py-[10px] max-sm:p-[20px] max-sm:gap-[10px]"
                }
            >
                <div className={"flex justify-between "}>
                    <div
                        className={
                            "text-[#211F23] text-2xl leading-[85%] font-bold max-sm:text-lg"
                        }
                    >
                        {item.subject?.full_name}
                    </div>
                    <div className={"flex items-center"}>
                        <div
                            className={"text-[18px] leading-[85%] text-[#7B7984] max-sm:text-[14px]"}>{item.typez?.type_full_name}</div>
                        <div>
                            {isCurrentTimeWithinLesson(
                                item.ring?.start_time,
                                item.ring?.end_time,
                            ) && (
                                <div
                                    className={
                                        "text-right text-[18px] font-bold leading-[85%] text-[#ED008C] ml-[20px] max-sm:text-[14px]"
                                    }
                                >
                                    {t.schedule.atPresent}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className={
                        "flex justify-between text-[#524FA2] text-[18px] font-bold max-sm:text-[14px]"
                    }
                >
                    <Link
                        href={`/${id}/teacher/${item.classroom?.id === classId ? item.teacher?.id : item.teacher2?.id}`}>
                        <div
                            className={""}>{item.classroom?.id === classId ? item.teacher?.full_name : item.teacher2?.full_name}
                        </div>
                    </Link>
                    <Link href={`/${id}/schedule/class/${item.classl?.id}`}>
                        <div className={""}>
                            {item.classl?.class_name}
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ScheduleClassroomCardComponent;
