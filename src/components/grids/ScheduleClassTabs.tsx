import {FC, useEffect, useState} from "react";
import Button from "@/components/ui/Button";
import {IClass} from "@/types/assets.type";
import {number} from "prop-types";
import ClassLetterTabs from "@/components/grids/ClassLetterTabs";
import {useRouter} from "next/router";

interface ScheduleProps {
    handleClick?: any;
    classl: IClass[];
    chooseClassNumber: any;
    selectedClassI:IClass[]|null;
    selectedClassII:IClass[]|null;
    selectedClassIII:IClass[]|null;

}
const ScheduleClassTabs: FC<ScheduleProps> = ({handleClick, classl, chooseClassNumber, selectedClassI, selectedClassII, selectedClassIII}) => {
    const [classNumbers, setClassNumbers] = useState<number[]>([]);

    useEffect(() => {
        const classNumbersArray = classl
            .map(item => item.class_number)
            .filter((number): number is number => number !== undefined);

        const classNumbersSet = new Set(classNumbersArray);
        const uniqueClassNumbersArray = Array.from(classNumbersSet);

        setClassNumbers(uniqueClassNumbersArray);
    }, [classl]);


    return (
        <div className={"flex flex-wrap gap-[20px]"}>
            {!selectedClassI && !selectedClassII && !selectedClassIII ? (
                classNumbers.sort((a,b) => a-b).map((item)=>(
                    <div key={item} onClick={() => chooseClassNumber(item)}
                        className="flex flex-col items-center gap-[15px] rounded-[28px] border-[3px] border-purple-800 justify-center w-[390px] h-[240px]"
                      >
                        <div className={"text-[72px] text-[#524FA2] font-bold leading-[80%]"}>
                            {item}
                        </div>
                        <div className={"text-[36px] text-black font-bold leading-[30%]"}>
                            класс
                        </div>
                    </div>
                ))
            ) : (
                <div className={"flex flex-col gap-[30px]"}>
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
            )}
        </div>
    )
}

const classDefault = [1,2,3,4,5,6,7,8,9,10,11];



export default ScheduleClassTabs;