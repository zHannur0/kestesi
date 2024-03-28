import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { IMenu } from "@/types/assets.type";
import { getMenuThunk, getSectionsThunk } from "@/store/thunks/school.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import SectionCard from "@/components/cards/SectionCard";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const SectionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = Number(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
  const sections = useTypedSelector((state) => state.schoolInfo.sections);
  useEffect(() => {
    id && dispatch(getSectionsThunk(id));
  }, [dispatch, id]);
  const handleBack = () => {
    router.push(`/school/${id}/main`);
  };

  return (
    <MainLayout isMain={false} link={t.sections.toTheMainPage} handleClick={handleBack} page={`/school/${id}/map`}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
          {t.sections.clubsAndSections}
      </h1>
      <div
        className={
          "flex flex-col gap-[20px] overflow-auto scrollbar-hide h-[910px] rounded-[20px] pb-[30px]"
        }
      >
        {sections.map((item) => (
          <SectionCard key={item.id} section={item} />
        ))}
      </div>
    </MainLayout>
  );
};

export default SectionsPage;
