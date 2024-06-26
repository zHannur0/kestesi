import { FC, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { IClass } from "@/types/assets.type";
import { number } from "prop-types";
import ClassLetterTabs from "@/components/grids/ClassLetterTabs";
import { useRouter } from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

interface ScheduleProps {
  handleClick?: any;
  classl: IClass[];
  chooseClassNumber: any;
  selectedClassI: IClass[] | null;
  selectedClassII: IClass[] | null;
  selectedClassIII: IClass[] | null;
}
const ScheduleClassTabs: FC<ScheduleProps> = ({
  handleClick,
  classl,
  chooseClassNumber,
  selectedClassI,
  selectedClassII,
  selectedClassIII,
}) => {
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const [classNumbers, setClassNumbers] = useState<number[]>([]);

  useEffect(() => {
    const classNumbersArray = classl
      .map((item) => item.class_number)
      .filter((number): number is number => number !== undefined);

    const classNumbersSet = new Set(classNumbersArray);
    const uniqueClassNumbersArray = Array.from(classNumbersSet);

    setClassNumbers(uniqueClassNumbersArray);
  }, [classl]);

  return (
      <>
      {!selectedClassI && !selectedClassII && !selectedClassIII ? (
          <div className={"flex flex-wrap gap-[20px] max-sm:gap-[10px] w-[100%] "}>
            {classNumbers
                .sort((a, b) => a - b)
                .map((item) => (
                    <div
                        key={item}
                        onClick={() => chooseClassNumber(item)}
                        className="flex btn-gradient-1 cursor-pointer flex-col items-center gap-[15px] rounded-[28px] justify-center w-[390px] h-[240px]
              max-sm:w-[31%] max-sm:h-[120px] vr:w-[31%] vr:h=[260px]"
                    >
                      <div
                          className={"text-[72px] text-[#524FA2] font-bold leading-[80%] max-sm:text-[48px] max-sm:leading-[30px]"}
                      >
                        {item}
                      </div>
                      <div
                          className={"text-[36px] text-black font-bold leading-[30%] max-sm:text-2xl max-sm:leading-[6px]"}>
                        {t.schedule.class}
                      </div>
                    </div>
                ))}
          </div>
      ) : (
        <div className={"flex flex-col gap-[30px] w-[100%] items-center"}>
      {selectedClassI && (
          <ClassLetterTabs classes={selectedClassI} smena={1}/>
      )}
      {selectedClassII && (
          <ClassLetterTabs classes={selectedClassII} smena={2}/>
      )}
      {selectedClassIII && (
          <ClassLetterTabs classes={selectedClassIII} smena={3}/>
      )}
      </div>
  )
}
</>
)
  ;
};

const classDefault = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default ScheduleClassTabs;
