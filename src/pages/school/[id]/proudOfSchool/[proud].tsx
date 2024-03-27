import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getArtThunk, getGoldThunk, getOlympiadThunk, getRedThunk, getSportThunk} from "@/store/thunks/school.thunk";
import Link from "next/link";
import StudentsCard from "@/components/cards/StudentsCard";

const ProudOfSchool = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const proudId = Number(router.query.proud);
    const dispatch = useAppDispatch();

    const sport = useTypedSelector((state) => state.schoolInfo.sport) || [];
    const oner = useTypedSelector((state) => state.schoolInfo.oner) || [];
    const altyn = useTypedSelector((state) => state.schoolInfo.altyn) || [];
    const atest = useTypedSelector((state) => state.schoolInfo.atest) || [];
    const olimp = useTypedSelector((state) => state.schoolInfo.olimp) || [];

    const [curr, setCurr] = useState<any[]>([]);
    console.log(sport);
    console.log(altyn);
    useEffect(() => {
        if(id) {
            dispatch(getSportThunk(id));
            dispatch(getArtThunk(id));
            dispatch(getOlympiadThunk(id));
            dispatch(getRedThunk(id));
            dispatch(getGoldThunk(id));
        }
    }, [dispatch,id]);

    useEffect(() => {
        if (proudId) {
            if(proudId === 1) {
                setCurr([...sport, ...oner, ...olimp, ...altyn, ...atest]);
            }else if(proudId === 2) {
                setCurr(sport);
            }else if(proudId === 3) {
                setCurr(oner);
            }else if(proudId === 4) {
                setCurr(olimp);
            }else if(proudId === 5) {
                setCurr(altyn);
            }else if(proudId === 6) {
                setCurr(atest);
            }
        }
    }, [id, proudId, sport, oner, altyn, olimp, atest]);

    console.log(curr)
    const handleBack = () => {
        router.push(`/school/${id}/main`);
    };
    return (
        <MainLayout isMain={false} link={"на главную"} handleClick={handleBack}>
            <h1 className="text-[#211F23] text-[36px] font-bold leading-[80%] mb-[30px]">
                Гордость школы
            </h1>
            <div
                className={"w-full max-h-[910px] py-[30px] px-[60px] bg-white flex flex-col gap-[30px] rounded-[40px] overflow-auto scrollbar-hide"}>
                <div className={"flex gap-[20px]"}>
                    {sidebar.map((item) => (
                        <Link href={`/school/${router.query.id}/proudOfSchool/${item.link}`} key={item.id}>
                            <div
                                className={"flex items-center justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                                style={{
                                    backgroundColor: item.id === proudId ? "#ED008C" : "white",
                                    color: item.id === proudId ? "white" : "#211F23",
                                    borderColor: item.id === proudId ? "#ED008C" : "#5D49A0",
                                }}>
                                {item.type}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={"flex gap-[20px] flex-wrap"}>
                    {
                        curr.map((item, index) => (
                            <StudentsCard id={item.id} key={index} photo={item.photo}
                                          student_success={item.student_success} fullname={item.fullname}/>
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    );
}

interface IType {
    id?: number;
    type?: string;
    link?: string;
}

const sidebar: IType[] = [
    {
        id: 1,
        type: "Все",
        link: "1",
    },

    {
        id: 2,
        type: "Спорт",
        link: "2",
    },

    {
        id: 3,
        type: "Искусство",
        link: "3",
    },

    {
        id: 4,
        type: "Предметная олимпиада",
        link: "4",
    },

    {
        id: 5,
        type: "Золотая медаль",
        link: "5",
    },

    {
        id: 6,
        type: "Крассный аттестат",
        link: "6",
    },
];

export default ProudOfSchool;