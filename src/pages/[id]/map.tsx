import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassroomsThunk,
  getMapThunk,
  getSchoolIdThunk,
  getSchoolPassportThunk,
  getSchoolThunk,
  getTeachersThunk,
  getTeacherThunk,
} from "@/store/thunks/school.thunk";
import {IMap} from "@/types/assets.type";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const SchoolMapPage = () => {
  const router = useRouter();
  const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  const map = useTypedSelector((state) => state.schoolInfo.map);
  const classrooms = useTypedSelector((state) => state.schoolInfo.classrooms);
    console.log(map)
    useEffect(() => {
        if (router.isReady && id) {
            dispatch(getMapThunk(id));
            dispatch(getClassroomsThunk(id));
        }
    }, [router.isReady, dispatch, id]);
  const [curr, setCurr] = useState<string>("flat1");
  const [currLink, setCurrLink] = useState<string>();
  const [filter,setFilter] = useState<number>();

    useEffect(() => {
        handleClick(curr);
    }, [map]);
    const handleClick = (flat: string) => {
        if(flat === "flat1") {
            setCurrLink(map?.[0]?.flat1);
            setCurr("flat1");
            setFilter(1);
        }else if(flat === "flat2") {
            setCurrLink(map?.[0]?.flat2);
            setCurr("flat2");
            setFilter(2);
        }else if(flat === "flat3") {
            setCurrLink(map?.[0]?.flat3);
            setFilter(3);
            setCurr("flat3");
        }else if(flat === "flat4") {
            setCurrLink(map?.[0]?.flat4);
            setFilter(4);
            setCurr("flat4");
        }else if(flat === "flat5") {
            setCurrLink(map?.[0]?.flat5);
            setFilter(5);
            setCurr("flat5");
        }
    };
  const handleBack = () => {
    router.push(`/${id}/main`);
  };

  return (
    <MainLayout handleClick={handleBack} isMain={false} link={t.map.toTheMainPage} page={`/${id}/map`} bg={"bg2"}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[20px]">
          {t.map.schoolMap}
      </h1>
        <div className={"flex gap-[20px]"}>
            <div
                className={"w-[1200px]  cursor-pointer h-[890px] bg-white rounded-[40px] p-[50px] flex flex-col gap-[27px]"}>
                <div className={"flex gap-[20px]"}>
                    <div
                        className={"flex items-center justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                        style={{
                            backgroundColor: curr === "flat1" ? "#ED008C" : "white",
                            color: curr === "flat1" ? "white" : "#211F23",
                            borderColor: curr === "flat1" ? "#ED008C" : "#5D49A0",
                        }}
                        onClick={() => handleClick("flat1")}
                    >
                        1 {t.map.floor}
                    </div>
                    {
                        map?.[0]?.flat2 && (
                            <div
                                className={"flex cursor-pointer items-center justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                                style={{
                                    backgroundColor: curr === "flat2" ? "#ED008C" : "white",
                                    color: curr === "flat2" ? "white" : "#211F23",
                                    borderColor: curr === "flat2" ? "#ED008C" : "#5D49A0",
                                }}
                                onClick={() => handleClick("flat2")}
                            >
                                2 {t.map.floor}
                            </div>
                        )
                    }
                    {
                        map?.[0]?.flat3 && (
                            <div
                                className={"flex items-center cursor-pointer justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                                style={{
                                    backgroundColor: curr === "flat3" ? "#ED008C" : "white",
                                    color: curr === "flat3" ? "white" : "#211F23",
                                    borderColor: curr === "flat3" ? "#ED008C" : "#5D49A0",
                                }}
                                onClick={() => handleClick("flat3")}
                            >
                                3 {t.map.floor}
                            </div>
                        )
                    }
                    {
                        map?.[0]?.flat4 && (
                            <div
                                className={"flex items-center cursor-pointer justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                                style={{
                                    backgroundColor: curr === "flat4" ? "#ED008C" : "white",
                                    color: curr === "flat4" ? "white" : "#211F23",
                                    borderColor: curr === "flat4" ? "#ED008C" : "#5D49A0",
                                }}
                                onClick={() => handleClick("flat4")}
                            >
                                4 {t.map.floor}
                            </div>
                        )
                    }
                    {
                        map?.[0]?.flat5 && (
                            <div
                                className={"flex items-center cursor-pointer justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px]"}
                                style={{
                                    backgroundColor: curr === "flat5" ? "#ED008C" : "white",
                                    color: curr === "flat5" ? "white" : "#211F23",
                                    borderColor: curr === "flat5" ? "#ED008C" : "#5D49A0",
                                }}
                                onClick={() => handleClick("flat5")}
                            >
                                5 {t.map.floor}
                            </div>
                        )
                    }
                </div>
                <img src={currLink ? currLink : "/images/map.svg"} alt="" className={"w-[100%] h-[100%]"}/>
            </div>
            <div className={"flex flex-col gap-[10px] h-[890px] overflow-auto  w-[500px] scrollbar-hide rounded-xl"}>
                {classrooms && classrooms.filter((item)=>item.flat===filter).sort((a, b) => {
                    if (a.classroom_number && b.classroom_number) {
                        return a.classroom_number - b.classroom_number;
                    }
                    return 0;
                }).map((item, index) => (
                    <div key={item.id}
                         className={"min-h-[90px] pl-[26px] pr-[30px] flex gap-[20px] bg-white items-center rounded-xl"}>
                        <Link href={`/${id}/schedule/classroom/${item?.id}`}>
                            <div className={"text-[#524FA2] text-[32px] font-normal leading-[94%]"}>
                                {item.classroom_number}
                            </div>
                        </Link>

                        <div className={"text-[28px] text-[#211F23] font-normal leading-[90%]"}>
                            {item.classroom_name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};

export default SchoolMapPage;
