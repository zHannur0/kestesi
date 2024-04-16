import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {getSchoolIdThunk, getSchoolPassportThunk, getSliderThunk} from "@/store/thunks/school.thunk";
import {useAppDispatch} from "@/hooks/useAppDispatch";

const YandexMapPage = () => {
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const id = String(router.query.id);
    const dispatch = useAppDispatch();
    const school = useTypedSelector((state) => state.schoolInfo.schoolId);
    useEffect(() => {
        if (router.isReady) {
            const id = String(router.query.id);
            if (id) {
                dispatch(getSchoolIdThunk(id));
            }
        }
    }, [router.isReady, dispatch, router.query.id]);

    const handleBack = () => {
        router.push(`/${id}`);
    };
    console.log(school)

    return (
        <MainLayout isMain={false} link={t.yandexMap.back} handleClick={handleBack} page={`/${id}/yandexMap`} bg={"bg3"}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                {t.yandexMap.title}
            </h1>
            <img src={``} alt="" className={"w-[1779px] h-[863px] rounded-[40px]"}/>
        </MainLayout>
    );
};

export default YandexMapPage;
