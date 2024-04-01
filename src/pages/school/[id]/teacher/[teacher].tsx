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
    const teach = Number(router.query.teacher);
    const teacher = useTypedSelector((state) => state.schoolInfo.teacher);
    console.log(teacher)

    useEffect(() => {
        id && dispatch(getTeacherThunk(teach));
    }, [dispatch, id]);

    const handleBack = () => {
        router.push(`/school/${id}/teachers`);
    };
    return (
        <MainLayout
            handleClick={handleBack}
            isMain={false}
            link={t.teachers.toQueueOfTeachers}
            page={`/school/${id}/teacher/${teach}`}
            bg={"bg3"}
        >
            <div className={``}>
                <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                    {teacher?.full_name }
                </h1>
                    <TeachersBlock teacher={teacher} />
            </div>
        </MainLayout>
    );
};

export default TeachersPage;
