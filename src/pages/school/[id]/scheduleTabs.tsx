import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getClassThunk,} from "@/store/thunks/school.thunk";
import MainLayout from "@/layouts/MainLayout";

import ScheduleClassTabs from "@/components/grids/ScheduleClassTabs";
import {IClass} from "@/types/assets.type";

const ScheduleTabsPage = () => {
    const router = useRouter();
    const id=Number(router.query.id);
    const dispatch = useAppDispatch();
    const classl = useTypedSelector((state) => state.schoolInfo.class);
    const [selectedClassI, setSelectedClassI] = useState<IClass[] | null>(null);
    const [selectedClassII, setSelectedClassII] = useState<IClass[] | null>(null)
    const [selectedClassIII, setSelectedClassIII] = useState<IClass[] | null>(null)

    useEffect(() => {
        id && dispatch(getClassThunk(id));
    }, [dispatch, id]);

    const handleBack = () => {
        if(selectedClassI || selectedClassII || selectedClassIII) {
            setSelectedClassI(null);
            setSelectedClassII(null);
            setSelectedClassIII(null);
        } else
        router.push(`/school/${id}/main`);
    }

    const chooseClassNumber = (classNum: number) => {
        if (classl) {
            let arr = classl.filter(item => item.class_number === classNum).sort((a, b) => {
                if (a.class_letter === undefined) return 1; // Поместить a после b, если class_letter у a не определен
                if (b.class_letter === undefined) return -1; // Поместить a перед b, если class_letter у b не определен

                return a.class_letter.charCodeAt(0) - b.class_letter.charCodeAt(0);
            });

            let i: IClass[] = [];
            let ii: IClass[] = [];
            let iii: IClass[] = [];

            arr.forEach((item) => {
                if (item.osnova_smena === 1) {
                    i.push(item);
                } else if (item.osnova_smena === 2) {
                    ii.push(item);
                } else if (item.osnova_smena === 3){
                    iii.push(item);
                }
            })

            if (i.length !== 0) {
                setSelectedClassI(i);
            }

            if (ii.length !== 0) {
                setSelectedClassII(ii);
            }

            if (iii.length !== 0) {
                setSelectedClassIII(iii);
            }
        }
    }

    return(
        <MainLayout handleClick={handleBack} isMain={false} link={selectedClassI || selectedClassII || selectedClassIII ? "к выбору класса" : "на главную"}>
            <>
                <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                    {"Расписание уроков и дополнительных занятий"}
                </h1>
            </>
            <div className={"flex w-[1720px] p-[50px] max-h-[860px] bg-[#FFF] rounded-[40px]"}>
                <div>
                    <ScheduleClassTabs classl={classl} chooseClassNumber={chooseClassNumber} selectedClassI={selectedClassI} selectedClassII={selectedClassII} selectedClassIII={selectedClassIII}/>
                </div>
                <div>

                </div>
            </div>
        </MainLayout>
    )
}


export default ScheduleTabsPage;