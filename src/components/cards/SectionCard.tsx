import { IKruzhok } from "@/types/assets.type";
import { FC } from "react";
import {useRouter} from "next/router";

interface IProps {
  section: IKruzhok;
}

const SectionCard: FC<IProps> = ({ section }) => {
    const router = useRouter();

    return (
    <div className={"w-full min-h-[320px] bg-white flex rounded-[20px] max-sm:flex-col vr:flex-col vr:rounded-[40px]"}>
      <div
        className={"rounded-l-[20px] w-[560px] max-sm:w-full max-sm:h-[200px] max-sm:rounded-t-[20px] max-sm:rounded-l-none vr:w-full vr:h-[430px] vr:rounded-l-none vr:rounded-t-[40px]"}
        style={{
          backgroundImage: `url(${section.photo})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className={"flex w-[1160px] flex-col gap-[20px] py-[25px] px-[20px]" +
            " max-sm:w-full max-sm:p-[20px] max-sm:gap-[10px] vr:w-full"}
      >
        <div
          className={"text-[32px] font-bold leading-[136.687%] text-[#524FA2] max-sm:text-lg vr:text-[40px]"}
        >
          {section.kruzhok_name}
        </div>
        <div className={"text-2xl font-medium leading-[23px] tracking-[0.5px] max-sm:text-[14px] vr:text-[30px]"}>
          {section.teacher.full_name}
        </div>
        <div
          className={
            "text-[20px] leading-[23px] tracking-[0.5px] text-[#7B7984] max-sm:text-[14px] vr:text-[30px]"
          }
        >
            {router.locale === "kz" ? "Мақсаты" : router.locale === "ru" ? "Цель" : "Aim"}: {section.purpose || "Отсутствует"}
        </div>
        <div className={"flex gap-[20px] max-sm:flex-col max-sm:gap-[10px] vr:flex-col vr:hidden"}>
          {section.lessons?.map((item, index) => (
            <div
              key={index}
              className={
                "py-[19px] px-[23px] flex rounded-[20px] justify-center items-center leading-[23px] tracking-[0.5px] text-[16px] bg-[#F9F8FD]" +
                  " max-sm:text-[14px] max-sm:py-[8px] max-sm:px-[11px] max-sm:rounded-[10px] max-sm:w-full max-sm:justify-start max-sm:gap-[10px] vr:text-[30px] vr:w-full vr:justify-start vr:gap-[20px]"
              }
            >
              <div className={"font-medium "}>
                {item.week_day && weekDays[item.week_day - 1]}
              </div>
              <div className={"text-[#7B7984]"}>{": " + item.start_end_time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export default SectionCard;
