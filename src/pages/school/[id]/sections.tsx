import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { IMenu } from "@/types/assets.type";
import { getMenuThunk, getSectionsThunk } from "@/store/thunks/school.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import SectionCard from "@/components/cards/SectionCard";

const SectionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = Number(router.query.id);
  const sections = useTypedSelector((state) => state.schoolInfo.sections);
  useEffect(() => {
    id && dispatch(getSectionsThunk(id));
  }, [dispatch, id]);
  console.log(sections);
  const handleBack = () => {
    router.push(`/school/${id}/main`);
  };

  return (
    <MainLayout isMain={false} link={"на главную"} handleClick={handleBack}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
        Кружки и секций
      </h1>
      <div
        className={
          "flex flex-col gap-[20px] overflow-auto scrollbar-hide h-[910px] rounded-[20px]"
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
