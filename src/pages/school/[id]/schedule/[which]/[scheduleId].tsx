import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getClassIdThunk, getClassThunk} from "@/store/thunks/school.thunk";
import Link from "next/link";

const SchedulePage = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const who = router.query.which;
  const classId = Number(router.query.scheduleId);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const handleBack = () => {
    router.push(`/school/${id}/scheduleTabs`);
  };
  const dispatch = useAppDispatch();
  let classl = useTypedSelector((state) => state.schoolInfo.classId);
  console.log(classl)
  useEffect(() => {
    id && dispatch(getClassIdThunk(classId));
  }, [dispatch, id, classId, who]);

  const getInitials = (fullName?: string) => {
    if (!fullName) return ""; // Return empty if fullName is falsy

    const parts = fullName.split(" ");
    if (parts.length === 0) return ""; // Return empty if no parts

    // Attempt to construct the desired format
    let initials = parts[0]; // Always add the first part
    if (parts.length > 1) {
      initials += ` ${parts[1][0]}.`; // Add the first initial of the second part, if exists
    }
    if (parts.length > 2) {
      initials += ` ${parts[2][0]}.`; // Add the first initial of the third part, if exists
    }

    return initials;
  };



  return (
    <MainLayout
      isMain={false}
      link={t.schedule.toChooseClass}
      handleClick={handleBack}
      page={`/school/${id}/schedule/${who}/${classId}`}
    >
      <div className={"flex justify-between w-full"}>
        <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
          {who === "class" && classl.class_name && (classl.class_name + " - ")}{t.schedule.name}
        </h1>
        <div className={"text-2xl text-[#7B7984]"}>
          {who === "class" && classl.class_teacher && t.schedule.classTeacher}: <Link className={"text-[#524FA2]"} href={`/school/${id}/schedule/teacher/${classl?.class_teacher?.id}`} >{who === "class" && classl.class_teacher && getInitials(classl.class_teacher.full_name)}</Link>
        </div>
      </div>

      <Schedule />
    </MainLayout>
  );
};

export default SchedulePage;
