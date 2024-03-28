import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolIdThunk,
  getSchoolPassportThunk,
  getSchoolThunk,
  getTeachersThunk,
  getTeacherThunk,
} from "@/store/thunks/school.thunk";
import TeachersTable from "@/components/lists/TeachersTable";
import TeachersBlock from "@/components/blocks/TeachersBlock";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
const TeachersPage = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const dispatch = useAppDispatch();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const teachers = useTypedSelector((state) => state.schoolInfo.teachers);
  const teacher = useTypedSelector((state) => state.schoolInfo.teacher);
  const [teacherId, setTeacherId] = useState<number | null>();
  useEffect(() => {
    id && dispatch(getTeachersThunk(id));
  }, [dispatch, id]);

  const handleChooseTeacher = (id?: number) => {
    setTeacherId(id);
    dispatch(getTeacherThunk(id));
  };

  const handleBack = () => {
    if (teacherId) setTeacherId(null);
    else router.push(`/school/${id}/main`);
  };
  return (
    <MainLayout
      handleClick={handleBack}
      isMain={false}
      link={teacherId ? t.teachers.toQueueOfTeachers : t.teachers.back}
      page={`/school/${id}/teachers`}
    >
      <div className={``}>
        <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
          {teacherId && teacher ? teacher.full_name : t.teachers.teachers }
        </h1>
        {!teacherId ? (
          <TeachersTable
            teachers={teachers}
            handleChooseTeacher={handleChooseTeacher}
          />
        ) : (
          <TeachersBlock teacher={teacher} />
        )}
      </div>
    </MainLayout>
  );
};

export default TeachersPage;
