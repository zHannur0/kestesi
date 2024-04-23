import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassroomsThunk,
  getMapThunk,
} from "@/store/thunks/school.thunk";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {IMap} from "@/types/assets.type";

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
    console.log(map)
  const classrooms = useTypedSelector((state) => state.schoolInfo.classrooms);
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
    router.push(`/${id}`);
  };

  return (
    <MainLayout handleClick={handleBack} isMain={false} link={t.map.toTheMainPage} page={`/${id}/map`} bg={"bg2"}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[20px] max-sm:text-2xl">
          {t.map.schoolMap}
      </h1>
        <div className={"flex gap-[20px] max-sm:flex-col h-full"}>
            <div
                className={"w-[1200px] cursor-pointer h-[890px] bg-white rounded-[40px] max-sm:rounded-[20px] p-[50px] flex flex-col gap-[27px] max-sm:w-full max-sm:p-[20px] max-sm:max-h-[450px] max-sm:h-auto max-sm:gap-[20px]"}>
                <div className="flex gap-[20px]">
                    {map && [1, 2, 3, 4, 5].map(floorNum => {
                        const flatKey = `flat${floorNum}` as keyof IMap; // Утверждение типа для ключей
                        if (map?.[0]?.[flatKey]) {
                            return (
                                <FloorButton
                                    key={floorNum}
                                    floorNum={floorNum}
                                    handleClick={() => handleClick(flatKey)}
                                    isSelected={curr === flatKey}
                                    translation={t}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
                <img src={currLink ? currLink : "/images/map.svg"} alt="" className={"w-[100%] h-[100%]"}/>
            </div>
            <div
                className={"flex flex-col grow gap-[10px] max-h-[890px] overflow-auto  w-[500px] scrollbar-hide rounded-xl max-sm:w-full max-sm:bg-white max-sm:max-h-[450px] max-sm:p-[20px]"}>
                {classrooms && classrooms.filter((item) => item.flat === filter).sort((a, b) => {
                    if (a.classroom_number && b.classroom_number) {
                        return a.classroom_number - b.classroom_number;
                    }
                    return 0;
                }).map((item, index) => (
                    <div key={item.id}
                         className={"min-h-[90px] pl-[26px] pr-[30px] flex gap-[20px] bg-white items-center rounded-xl max-sm:w-full max-sm:min-h-0 max-sm:p-[10px]"}>
                        <Link href={`/${id}/schedule/classroom/${item?.id}`}>
                            <div className={"text-[#524FA2] text-[32px] font-normal leading-[94%] max-sm:text-[14px]"}>
                                {item.classroom_number}
                            </div>
                        </Link>

                        <div className={"text-[28px] text-[#211F23] font-normal leading-[90%] max-sm:text-[14px]"}>
                            {item.classroom_name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};

interface FloorButtonProps {
    floorNum: number;
    handleClick: (floorId: string) => void;
    isSelected: boolean;
    translation: { map: { floor: string } };
}

const FloorButton: React.FC<FloorButtonProps> = ({ floorNum, handleClick, isSelected, translation }) => {
    const className = `flex items-center justify-center p-[20px] border-2 rounded-[20px] text-2xl font-bold leading-[20px] cursor-pointer 
    max-sm:text-lg max-sm:px-[20px] max-sm:py-[15px] max-sm:rounded-[10px]`;
    const style = {
        backgroundColor: isSelected ? "#ED008C" : "white",
        color: isSelected ? "white" : "#211F23",
        borderColor: isSelected ? "#ED008C" : "#5D49A0",
    };

    return (
        <div className={className} style={style} onClick={() => handleClick(`flat${floorNum}`)}>
            {floorNum} {translation.map.floor}
        </div>
    );
};
export default SchoolMapPage;
