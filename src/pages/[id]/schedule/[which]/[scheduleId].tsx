import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getClassIdThunk, getClassroomThunk, getClassThunk, getTeacherThunk} from "@/store/thunks/school.thunk";
import Link from "next/link";

const getInitials = (fullName?: string) => {
  if (!fullName) return "";

  const parts = fullName.split(" ");
  if (parts.length === 0) return "";

  let initials = parts[0];
  if (parts.length > 1) {
    initials += ` ${parts[1][0]}.`;
  }
  if (parts.length > 2) {
    initials += ` ${parts[2][0]}.`;
  }

  return initials;
};

const SchedulePage = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const who = router.query.which;
  const classId = Number(router.query.scheduleId);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  let classl = useTypedSelector((state) => state.schoolInfo.classId);
  let teacher = useTypedSelector((state) => state.schoolInfo.teacher);
  let classroom = useTypedSelector((state) => state.schoolInfo.classroomId);

  useEffect(() => {
    if (router.isReady && id && classId) {
      if(who === "teacher") {
        dispatch(getTeacherThunk(classId));
      }else if(who==="classroom") {
        dispatch(getClassroomThunk(classId))
      }else {
        dispatch(getClassIdThunk(classId));
      }
    }
  }, [router.isReady, dispatch, id, classId, who]);


  return (
    <MainLayout
      isMain={false}
      link={t.schedule.toChooseClass}
      // handleClick={handleBack}
      page={`/${id}/schedule/${who}/${classId}`}
      bg={"bg4"}
      back={true}
    >
      <div className={"flex justify-between w-full"}>
            <h1 className="text-[#211F23] text-4xl leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px] vr:text-[50px] vr:mb-[50px]">
    <span className="font-bold">
      {who === "teacher" ? teacher?.full_name && teacher.full_name  : who === "classroom" ? classroom?.classroom_number && classroom.classroom_number + " " + t.schedule.cabinet : classl.class_name + " " + t.schedule.class} -
    </span>
               {" " + t.schedule.name}
            </h1>
        <div className={"text-2xl text-[#7B7984] vr:hidden max-sm:hidden"}>
          {who === "class" && classl.class_teacher && t.schedule.classTeacher}: <Link className={"text-[#524FA2]"} href={`/${id}/teacher/${classl?.class_teacher?.id}`}>{who === "class" && classl.class_teacher && getInitials(classl.class_teacher.full_name)}</Link>
        </div>
      </div>
      <Schedule/>
    </MainLayout>
  );
};

export default SchedulePage;
