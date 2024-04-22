import { IClass } from "@/types/assets.type";
import { FC } from "react";
import { useRouter } from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

interface IProps {
  classes: IClass[] | null;
  smena: number;
}

const ClassLetterTabs: FC<IProps> = ({ classes, smena }) => {
  const router = useRouter();
  const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;

  const handleClick = (scheduleId: any) => {
    router.push(`/${id}/schedule/class/${scheduleId}`);
  };
  return (
    <div className={"flex flex-col gap-[30px] w-[100%] max-sm:gap-[20px]"}>
      <div className={"text-[30px] font-bold leading-[71%] max-sm:text-2xl w-full"}>
        {smena === 1 && t.schedule.firstShift}
        {smena === 2 && t.schedule.secondShift}
        {smena === 3 && t.schedule.thirdShift}
      </div>
      <div className={"flex gap-[20px] flex-wrap max-sm:gap-[10px] w-[100%]"}>
        {classes?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={
              "flex justify-center btn-gradient-1 items-center w-[145px] h-[150px] rounded-[30px] text-[72px] text-[#524FA2] font-bold leading-[80%]" +
                " max-sm:h-[120px] max-sm:w-[30%]"
            }
          >
            {item.class_letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassLetterTabs;
