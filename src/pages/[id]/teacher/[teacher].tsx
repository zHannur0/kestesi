import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
    getTeacherThunk,
} from "@/store/thunks/school.thunk";
import TeachersBlock from "@/components/blocks/TeachersBlock";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
const TeachersPage = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const dispatch = useAppDispatch();
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const teach = Number(router.query.teacher);
    const teacher = useTypedSelector((state) => state.schoolInfo.teacher);
    useEffect(() => {
        if (router.isReady && id && teach) {
            dispatch(getTeacherThunk(teach));
        }
    }, [router.isReady, dispatch, id, teach]);

    const handleBack = () => {
        router.push(`/school/${id}/teachers`);
    };
    return (
        <MainLayout
            handleClick={handleBack}
            isMain={false}
            page={`/${id}/teacher/${teach}`}
            bg={"bg3"}
            back={true}
        >
            <div className={``}>
                <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px]">
                    {teacher?.full_name }
                </h1>
                    <TeachersBlock teacher={teacher} />
            </div>
        </MainLayout>
    );
};

export default TeachersPage;
