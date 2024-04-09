import { IDopSchedule, ISchedule } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Link from "next/link";

interface IProps {
    item: ISchedule;
    index: number;
    dayNumber: number;
}

const ScheduleTeacherCardComponent: FC<IProps> = ({ item, index, dayNumber }) => {
    const router = useRouter();
    const id = String(router.query.id);
    const classId = Number(router.query.scheduleId);
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
        const splitTime: string[] = time?.split(":") as string[];
        const removeSeconds: string = splitTime?.slice(0, 2).join(":");
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
            className={"w-[870px] rounded-[20px] bg-[#F9F8FD] flex"}
            style={{ height: item.teacher2 && item.classroom2 ? "137px" : "100px" }}
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
                    "w-[100px] flex flex-col items-center pt-[23px]  gap-[20px] pb-[24px]  rounded-tl-[20px] rounded-bl-[20px]"
                }
            >
                <div className={"text-white text-2xl leading-[85%] font-bold"}>
                    {removeSecondOfTime(item.ring?.start_time)}
                </div>
                <div className={"text-white text-[18px] leading-[26%] font-normal"}>
                    {index + 1 + " " + t.schedule.lesson}
                </div>
            </div>
            <div
                className={
                    "pt-[23px] pb-[24px] pr-[50px] pl-[23px] h-[100%] flex flex-col gap-[20px] w-[100%]"
                }
            >
                <div className={"flex justify-between"}>
                    <div
                        className={
                            "text-[#211F23] text-2xl leading-[85%] font-bold"
                        }
                    >
                        {item.subject?.full_name}
                    </div>
                    <div>
                        {isCurrentTimeWithinLesson(
                            item.ring?.start_time,
                            item.ring?.end_time,
                        ) && (
                            <div
                                className={
                                    "text-right text-[18px] font-bold leading-[85%] text-[#ED008C]"
                                }
                            >
                                {t.schedule.atPresent}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={
                        "flex justify-between text-[#524FA2] text-[18px] leading-[26%] "
                    }
                >
                    <Link href={`/${id}/schedule/class/${item.classl?.id}`}>
                        <div className={"font-bold"}>
                            {item.classl?.class_name}
                        </div>
                    </Link>
                    <div className={""}>
                        <span className={"text-[#7B7984] font-normal"}>{t.schedule.cabinet}</span>{" "}
                        <Link href={`/${id}/schedule/classroom/${item.teacher?.id === classId ? item.classroom?.id : item.classroom2?.id}`} className={"font-bold "}>
                            {item.teacher?.id === classId ? item.classroom?.classroom_number : item.classroom2?.classroom_number }
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScheduleTeacherCardComponent;
