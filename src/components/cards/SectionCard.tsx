import { IKruzhok } from "@/types/assets.type";
import { FC } from "react";

interface IProps {
  section: IKruzhok;
}

const SectionCard: FC<IProps> = ({ section }) => {
  return (
    <div className={"w-[1720px] min-h-[320px] bg-white flex rounded-[20px]"}>
      <div
        className={"rounded-l-[20px]"}
        style={{
          backgroundImage: `url(${section.photo})`,
          width: "560px",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className={"flex w-[1160px] flex-col gap-[20px] py-[25px] px-[20px]"}
      >
        <div
          className={"text-[32px] font-bold leading-[136.687%] text-[#524FA2]"}
        >
          {section.kruzhok_name}
        </div>
        <div className={"text-2xl font-medium leading-[23px] tracking-[0.5px]"}>
          {section.teacher.full_name}
        </div>
        <div
          className={
            "text-[20px] leading-[23px] tracking-[0.5px] text-[#7B7984]"
          }
        >
          Цель:{section.purpose || "Отсутствует"}
        </div>
        <div className={"flex gap-[20px]"}>
          {section.lessons?.map((item, index) => (
            <div
              key={index}
              className={
                "py-[19px] px-[23px] flex rounded-[20px] justify-center items-center leading-[23px] tracking-[0.5px] text-[16px] bg-[#F9F8FD]"
              }
            >
              <div className={"font-medium "}>
                {item.week_day && weekDays[item.week_day - 1]}:
              </div>
              <div className={"text-[#7B7984]"}>{item.start_end_time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export default SectionCard;
