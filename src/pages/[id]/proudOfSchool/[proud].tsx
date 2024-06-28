import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {
    getPrideThunk,
} from "@/store/thunks/school.thunk";
import Link from "next/link";
import StudentsCard from "@/components/cards/StudentsCard";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {ISchoolPride} from "@/types/assets.type";
import StudentBlock from "@/components/blocks/StudentBlock";
import {log} from "node:util";
interface IType {
    id?: number;
    type?: string;
    link?: string;
}

const ProudOfSchool = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const proudId = Number(router.query.proud);
    const dispatch = useAppDispatch();
    const [currStudent, setCurrStudent] = useState<ISchoolPride | null>();
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const pride = useTypedSelector((state) => state.schoolInfo.pride);
    const [curr, setCurr] = useState<ISchoolPride[]>([]);
    const [sideBar, setSideBar] = useState<IType[]>();
    useEffect(() => {
        setSideBar( [  {
            id: 1,
            type: t.proud.all,
            link: "1",
        },
            {
                id: 2,
                type: t.proud.sports,
                link: "2",
            },

            {
                id: 3,
                type: t.proud.art,
                link: "3",
            },

            {
                id: 4,
                type: t.proud.subjectOlympiad,
                link: "4",
            },

            {
                id: 5,
                type: t.proud.goldMedal,
                link: "5",
            },

            {
                id: 6,
                type: t.proud.redDiploma,
                link: "6",
            },])
    }, [t]);
    useEffect(() => {
        if (router.isReady && id) {
            dispatch(getPrideThunk(id));
        }
    }, [router.isReady, dispatch, id]);

    useEffect(() => {
        if (proudId && pride) {
            if(proudId === 1) {
                setCurr(pride);
            }else if(proudId === 2) {
                setCurr(pride.filter((item) => item.success === "sport"));
            }else if(proudId === 3) {
                setCurr(pride.filter((item) => item.success === "oner"));
            }else if(proudId === 4) {
                setCurr(pride.filter((item) => item.success === "olimpiada"));
            }else if(proudId === 5) {
                setCurr(pride.filter((item) => item.success === "altynbelgi"));
            }else if(proudId === 6) {
                setCurr(pride.filter((item) => item.success === "redcertificate"));
            }
        }
    }, [id, proudId, pride]);

    const handleBack = () => {
        if(currStudent) {
            setCurrStudent(null);
        }else
        router.push(`/${id}`);
    };

    return (
        <MainLayout isMain={false} link={t.proud.toTheMainPage} handleClick={handleBack} page={`/${id}/proudOfSchool/${proudId}`} bg={"bg2"}>
            {currStudent ? <StudentBlock student={currStudent}/> :
                <>
                    <h1 className="text-[#211F23] text-[36px] font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px] vr:text-[50px]">
                        {t.proud.schoolPride}
                    </h1>
                    <div
                        className={"w-full relative max-h-[910px] vr:max-h-[1600px] vr:h-auto py-[30px] px-[60px] bg-white flex flex-col gap-[30px] rounded-[40px] overflow-hidden scrollbar-hide  max-sm:px-[20px]"}>
                        <div className={"flex flex-wrap gap-[20px] bg-white max-sm:gap-[10px]"}>
                            {sideBar?.map((item) => (
                                <Link href={`/${router.query.id}/proudOfSchool/${item.link}`} key={item.id}>
                                    <div
                                        className={"flex items-center justify-center rounded-[20px] text-2xl font-bold leading-[20px] " +
                                            " max-sm:rounded-[10px] max-sm:text-lg vr:text-[40px] "}
                                        style={{
                                            backgroundColor: item.id === proudId ? "#ED008C" : "white",
                                            color: item.id === proudId ? "white" : "#211F23",
                                            border: "3px solid transparent",
                                            backgroundImage: item.id === proudId ? "none" : "linear-gradient(white, white), linear-gradient(to right, #5D49A0, #E9028E)",
                                            backgroundOrigin: 'border-box',
                                            backgroundClip: item.id === proudId ? 'padding-box' : 'content-box, border-box',
                                        }}>
                                        <p className={"p-[20px] max-sm:py-[10px] vr:py-[22px] vr:px-[34px]"}>{item.type}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div
                            className={"flex gap-[20px] flex-wrap max-h-[810px] vr:max-h-[1500px] overflow-auto scrollbar-hide rounded-[2px] " +
                                " max-sm:flex-col max-sm:gap-[10px] max-sm:flex-nowrap max-sm:w-full vr:flex-nowrap vr:flex-col vr:w-full"}>
                            {
                                curr?.slice().sort((a, b) => a.id - b.id).map((item, index) => (
                                    <div key={item.id} onClick={() => setCurrStudent(item)}>
                                        <StudentsCard id={item.id} photo={item.photo}
                                                      student_success={item.student_success} fullname={item.fullname}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>

            }
        </MainLayout>
    );
}


export default ProudOfSchool;