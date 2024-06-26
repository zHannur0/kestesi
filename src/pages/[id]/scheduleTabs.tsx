import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { getClassThunk } from "@/store/thunks/school.thunk";
import MainLayout from "@/layouts/MainLayout";

import ScheduleClassTabs from "@/components/grids/ScheduleClassTabs";
import { IClass } from "@/types/assets.type";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const ScheduleTabsPage = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  const classl = useTypedSelector((state) => state.schoolInfo.class);
  const [curr, setCurr] = useState<number | null>(null);
  const [selectedClassI, setSelectedClassI] = useState<IClass[] | null>(null);
  const [selectedClassII, setSelectedClassII] = useState<IClass[] | null>(null);
  const [selectedClassIII, setSelectedClassIII] = useState<IClass[] | null>(
    null,
  );
  console.log(classl)

  useEffect(() => {
    if (router.isReady && id) {
      dispatch(getClassThunk(id));
    }
  }, [router.isReady, dispatch, id]);

  const handleBack = () => {
    if (selectedClassI || selectedClassII || selectedClassIII) {
      setSelectedClassI(null);
      setSelectedClassII(null);
      setSelectedClassIII(null);
      setCurr(null)
    } else router.push(`/${id}`);
  };

  const chooseClassNumber = (classNum: number) => {
    if (classl) {
      let arr = classl
        .filter((item) => item.class_number === classNum)
        .sort((a, b) => {
          if (a.class_letter === undefined) return 1;
          if (b.class_letter === undefined) return -1;

          return a.class_letter?.charCodeAt(0) - b.class_letter?.charCodeAt(0);
        });

      let i: IClass[] = [];
      let ii: IClass[] = [];
      let iii: IClass[] = [];

      arr.forEach((item) => {
        if (item.osnova_smena === 1) {
          i.push(item);
        } else if (item.osnova_smena === 2) {
          ii.push(item);
        } else if (item.osnova_smena === 3) {
          iii.push(item);
        }
      });

      if (i.length !== 0) {
        setSelectedClassI(i);
      }

      if (ii.length !== 0) {
        setSelectedClassII(ii);
      }

      if (iii.length !== 0) {
        setSelectedClassIII(iii);
      }
      setCurr(arr?.[0]?.class_number || null);
    }
  };

  return (
    <MainLayout
      handleClick={handleBack}
      isMain={false}
      link={
        selectedClassI || selectedClassII || selectedClassIII
          ? t.schedule.toChooseClass
          : t.schedule.toTheMainPage
      }
      page={`/${id}/scheduleTabs`}
      bg={curr ? "bg3" : "bg2"}
    >
      <>
        <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:leading-[30px] max-sm:px-[10px] max-sm:mb-[15px] vr:text-[50px] vr:leading-[65px] vr:mb-[50px]">
          {curr && (curr + " " + t.schedule.classes + " - ")}<span className={`${curr ? "font-normal" : "font-bold"}`}>{t.schedule.name}</span>
        </h1>
      </>
      <div
        className={
          "flex p-[50px] max-h-[860px] bg-[#FFF] rounded-[40px] w-[100%] max-sm:p-[20px] vr:p-[40px] max-sm:rounded-[20px] vr:rounded-[40px] vr:max-h-none max-sm:max-h-none "
        }
      >
        <div>
          <ScheduleClassTabs
            classl={classl}
            chooseClassNumber={chooseClassNumber}
            selectedClassI={selectedClassI}
            selectedClassII={selectedClassII}
            selectedClassIII={selectedClassIII}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ScheduleTabsPage;
