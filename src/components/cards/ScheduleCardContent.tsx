import {IDopSchedule, ISchedule} from "@/types/assets.type";
import {FC} from "react";

interface IProps{
    item: ISchedule;
    index: number;
}

const ScheduleCardComponent: FC<IProps> = ({item,index}) => {
    function removeSecondOfTime(time?: string): string {
        const splitTime: string[] = time?.split(":") as string[];
        const removeSeconds: string = splitTime?.slice(0, 2).join(":");
        return removeSeconds;
    }
    return (
        <div key={item.id} className={"w-[870px] min-h-[100px] rounded-[20px] bg-[#F9F8FD] flex"}>
            <div
                className={"w-[100px] flex flex-col items-center justify-center gap-[20px] rounded-tl-[20px] rounded-bl-[20px] bg-[#7B7984]"}>
                <div className={"text-white text-2xl leading-[85%] font-bold"}>
                    {removeSecondOfTime(item.ring?.start_time)}
                </div>
                <div className={"text-white text-[18px] leading-[26%] font-normal"}>
                    {index + 1} урок
                </div>
            </div>
            <div className={"pt-[20px] pb-[30px] pr-[50px] pl-[23px] flex flex-col gap-[19px] w-[100%]"}>
                <div className={"text-[#211F23] text-2xl leading-[85%] font-bold tracking-[1.44px]"}>
                    {item.subject?.full_name}
                </div>
                <div className={"flex justify-between text-[#524FA2] text-[18px] leading-[26%] font-bold "}>
                    <div className={""}>
                        {item.teacher?.full_name}
                    </div>
                    <div className={""}>
                        <span className={"text-[#7B7984]"}>Кабинет</span> {item.classroom?.classroom_number}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCardComponent;
