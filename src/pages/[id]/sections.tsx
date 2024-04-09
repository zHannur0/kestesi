import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { IMenu } from "@/types/assets.type";
import {getMenuThunk, getSectionsThunk, getSectionThunk} from "@/store/thunks/school.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import SectionCard from "@/components/cards/SectionCard";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import SectionsBlock from "@/components/blocks/SectionsBlock";

const SectionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
  const sections = useTypedSelector((state) => state.schoolInfo.sections);
  const sectionId = useTypedSelector((state) => state.schoolInfo.sectionId);
    const [curr, setCurr] = useState<number | null>(null);

    useEffect(() => {
        if (router.isReady && id) {
            dispatch(getSectionsThunk(id));
        }
    }, [router.isReady, dispatch, id]);


    useEffect(() => {
        if(curr)
        dispatch(getSectionThunk(curr))
    }, [curr]);

  const handleBack = () => {
      if(curr) setCurr(null)
      else
        router.push(`/${id}/main`);
  };

  return (
    <MainLayout isMain={false} link={t.sections.toTheMainPage} handleClick={handleBack} page={`/${id}/sections`} bg={curr ? "bg3":"bg2"}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
          {t.sections.clubsAndSections}
      </h1>
        {
            curr ? (
                <SectionsBlock section={sectionId}/>
            ) : (
                <div
                    className={
                        "flex flex-col gap-[20px] overflow-auto scrollbar-hide h-[910px] rounded-[20px] pb-[30px]"
                    }
                >
                    {sections.map((item) => (
                        <div key={item.id} onClick={() => setCurr(item.id || null)}>
                            <SectionCard section={item}/>
                        </div>
                    ))}
                </div>
            )
        }

    </MainLayout>
  );
};

export default SectionsPage;
