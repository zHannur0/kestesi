import {IDopSchedule, ISchedule} from "@/types/assets.type";
import {FC, useEffect, useState} from "react";

interface IProps{
    item: ISchedule;
    index: number;
    dayNumber: number
}

const ScheduleCardComponent: FC<IProps> = ({item,index, dayNumber}) => {
    const getInitials = (fullName?: string) => {
        if (!fullName) return ""; // Return empty if fullName is falsy

        const parts = fullName.split(" ");
        if (parts.length === 0) return ""; // Return empty if no parts

        // Attempt to construct the desired format
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
        const intervalId = setInterval(()=> {
            setTime(new Date());
        }, 60000);
        return () => clearInterval(intervalId);
    }, [])

    function createTime(date: Date, time:string) {
        const [hours, minutes] = time.split(':').map(Number);
        date.setHours(hours, minutes, 0, 0);
        return new Date(date);
    }

    function isCurrentTimeWithinLesson(startTimeStr?:string, endTimeStr?: string) {
        const startTime = createTime(new Date(time), startTimeStr || "");
        const endTime = createTime(new Date(time), endTimeStr || "");
        return time?.getDay() === dayNumber && time >= startTime && time <= endTime;
    }

    return (
        <div key={item.id} className={"w-[870px] rounded-[20px] bg-[#F9F8FD] flex"}
             style={{height: item.teacher2 && item.classroom2   ? "137px" : "100px"}}>
            <div
                style={{backgroundColor: isCurrentTimeWithinLesson(item.ring?.start_time, item.ring?.end_time) ? "#ED008C" : "#7B7984"}}
                className={"w-[100px] flex flex-col items-center justify-center gap-[20px] rounded-tl-[20px] rounded-bl-[20px]"}>
                <div className={"text-white text-2xl leading-[85%] font-bold"}>
                    {removeSecondOfTime(item.ring?.start_time)}
                </div>
                <div className={"text-white text-[18px] leading-[26%] font-normal"}>
                    {index + 1} урок
                </div>
            </div>
            <div className={"pt-[20px] pb-[30px] pr-[50px] pl-[23px] h-[100%] flex flex-col gap-[20px] w-[100%]"}>
                <div className={"flex justify-between"}>
                    <div
                        className={"text-[#211F23] text-2xl leading-[85%] font-bold tracking-[1.44px]"}>
                        {item.subject?.full_name}
                    </div>
                    <div>
                        {isCurrentTimeWithinLesson(item.ring?.start_time, item.ring?.end_time) && (
                                <div
                                    className={"text-right text-[18px] font-bold leading-[85%] text-[#ED008C]"}>
                                    идет сейчас
                                </div>
                            )}
                    </div>
                </div>

                <div
                    className={"flex justify-between text-[#524FA2] text-[18px] leading-[26%] font-bold "}>
                    <div className={""}>
                        {getInitials(item.teacher?.full_name)}
                    </div>
                    <div className={""}>
                        <span className={"text-[#7B7984]"}>Кабинет</span> {item.classroom?.classroom_number}
                    </div>
                </div>
                {
                    item.teacher2 && item.classroom2 && (
                        <div className={"flex flex-col gap-[10px]"}>
                            <div>
                                <hr/>
                            </div>
                            <div
                                className={"flex justify-between text-[#524FA2] text-[18px] leading-[26%] font-bold "}>
                                <div className={""}>
                                    {getInitials(item.teacher2?.full_name)}
                                </div>
                                <div className={""}>
                                                    <span
                                                        className={"text-[#7B7984]"}>Кабинет</span> {item.classroom2?.classroom_number}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ScheduleCardComponent;
