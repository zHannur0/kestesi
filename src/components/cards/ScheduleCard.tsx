import {FC, useEffect, useState} from "react";
import {IDopSchedule, ISchedule} from "@/types/assets.type";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";

interface IProps{
    os: ISchedule[];
    dop: IDopSchedule[];
    day: string;
}

const ScheduleCards: FC<IProps> = ({os,dop,day}) => {

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

    const [time, setTime] = useState<Date>();
    useEffect(() => {
        setInterval(()=>setTime(new Date()), 60000);
    }, [])

    return(
      <div className={"flex flex-col gap-[30px] bg-[#fff] w-[960px] h-[852px] px-[45px] py-[53px] rounded-[40px]"}>
        <div className={"flex justify-between items-center"}>
            <div className={"text-[32px] font-bold leading-[71%] text-[#211F23]"}>
                {day}
            </div>
            <div className={"text-right text-[18px] font-bold leading-[85%] text-[#ED008C]"}>
                Сегодня
            </div>
        </div>
          <div className={"flex flex-col gap-[20px] h-[690px] overflow-auto scrollbar-hide"}>
              {
                  os.sort().map((item, index) => (
                      <div key={item.id} className={"w-[870px] min-h-[100px] rounded-[20px] bg-[#F9F8FD] flex"}>
                            <div className={"w-[100px] flex flex-col items-center justify-center gap-[20px] rounded-tl-[20px] rounded-bl-[20px] bg-[#7B7984]"}>
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
                                            {getInitials(item.teacher?.full_name)}
                                        </div>
                                        <div className={""}>
                                            <span className={"text-[#7B7984]"}>Кабинет</span> {item.classroom?.classroom_number}
                                        </div>
                                    </div>
                                    {
                                        item.teacher2 && (
                                            <div>
                                                <hr/>
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
                  ))
              }
              {
                  dop.length > 0 && <div className={"text-2xl leading-[80%]"}>Дополнительные уроки</div>
              }
              {
                  dop.length > 0 && (
                      dop.sort().map((item, index) => (
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
                      ))
                  )
              }
          </div>
      </div>
    )
}


export default ScheduleCards;

