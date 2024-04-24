import { FC, useEffect, useState } from "react";
import { IDopSchedule, ISchedule } from "@/types/assets.type";
import { allowedDisplayValues } from "next/dist/compiled/@next/font/dist/constants";
import ScheduleCardContent from "@/components/cards/ScheduleCardContent";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useRouter} from "next/router";
import ScheduleTeacherCardContent from "@/components/cards/ScheduleTeacherCardContent";
import ScheduleClassroomCardContent from "@/components/cards/ScheduleClassroomCardContent";

interface IProps {
  os: ISchedule[];
  dop: IDopSchedule[];
  day: string;
  dayNumber: number;
}

const ScheduleCards: FC<IProps> = ({ os, dop, day, dayNumber }) => {
  const [time, setTime] = useState<Date>(new Date());
  const router = useRouter();
  const who = router.query.which;
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  return (
    <div
      className={
        "flex flex-col gap-[30px] bg-[#fff] w-[960px] max-h-[915px] px-[45px] pt-[53px] pb-[30px] rounded-[40px]" +
          " max-sm:w-full max-sm:rounded-[20px] max-sm:h-[560px] max-sm:py-[10px] max-sm:px-[20px]"
      }
    >
      <div className={"flex justify-between items-center"}>
        <div className={"text-[32px] font-bold leading-[71%] text-[#211F23] max-sm:text-2xl max-sm:leading-[30px] max-sm:text-2xl"}>
          {day}
        </div>
        {time?.getDay() === dayNumber && (
          <div
            className={
              "text-right text-[18px] font-bold leading-[85%] text-[#ED008C] max-sm:text-lg max-sm:leading-[30px]"
            }
          >
            {t.schedule.Today}
          </div>
        )}
      </div>
      {
        os && os.length > 0 ? (
            <div
                className={
                  "flex flex-col gap-[20px] h-max-[690px] overflow-auto scrollbar-hide"
                }
            >
              {os.sort().map((item, index) => (
                  <div key={item.id}>
                    {
                        who === "class" && <ScheduleCardContent
                            dayNumber={dayNumber}
                            index={index}
                            item={item}
                        />
                    }
                    {
                        who === "teacher" && <ScheduleTeacherCardContent
                            dayNumber={dayNumber}
                            index={index}
                            item={item}
                        />
                    }
                    {
                        who === "classroom" && <ScheduleClassroomCardContent
                            dayNumber={dayNumber}
                            index={index}
                            item={item}
                        />
                    }
                  </div>

              ))}
              {dop.length > 0 && (
                  <div className={"text-2xl leading-[80%]"}>{t.schedule.additionalLessons}</div>
              )}
              {dop.length > 0 &&
                  dop
                      .sort()
                      .map((item, index) => (
                          <div key={item.id}>
                            {
                                who === "class" && <ScheduleCardContent
                                    dayNumber={dayNumber}
                                    index={index}
                                    item={item}
                                />
                            }
                            {
                                who === "teacher" && <ScheduleTeacherCardContent
                                    dayNumber={dayNumber}
                                    index={index}
                                    item={item}
                                />
                            }
                            {
                                who === "classroom" && <ScheduleClassroomCardContent
                                    dayNumber={dayNumber}
                                    index={index}
                                    item={item}
                                />
                            }
                          </div>
                      ))}
            </div>
        ) : (
            <div className={"flex items-center justify-center text-[#7B7984] text-[30px] leading-[71%] h-[700px]"}>
              {t.schedule.noLessons}
            </div>
        )
      }

    </div>
  );
};

export default ScheduleCards;
