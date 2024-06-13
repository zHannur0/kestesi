import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {getAdministrationThunk, getDirectorThunk, getNewsThunk} from "@/store/thunks/school.thunk";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const Administration = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || kz;
    const dispatch = useAppDispatch();
    const director = useTypedSelector((state) => state.schoolInfo.director);
    const administration = useTypedSelector((state) => state.schoolInfo.administration);
    useEffect(() => {
        if (router.isReady && id) {
            dispatch(getDirectorThunk(id));
            dispatch(getAdministrationThunk(id));
        }
    }, [router.isReady, dispatch, id]);

    const handleBack = () => {
        router.push(`/${id}/schoolInformation`);
    };
    return (
        <MainLayout isMain={false} link={t.administration.toSchoolPassport} handleClick={handleBack} page={`/${id}/administration`} bg={"bg3"}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px] vr:text-[50px]">
                {t.administration.administration}
            </h1>
            <div className={"flex flex-col bg-white rounded-[40px] w-[100%] max-h-[900px] max-sm:rounded-[20px] vr:max-h-[1600px]"}>
                <div className={"flex gap-[50px] py-[46px] px-[50px] bg-[#F8F8FB] rounded-tl-[40px] rounded-tr-[40px] w-[100%] h-[362px] items-center max-sm:h-auto" +
                    " max-sm:p-[20px] max-sm:gap-[10px] vr:h-auto"}>
                    <img src={director ? director?.[0]?.director_photo : "/images/user.svg"} alt="" className={"w-[270px] h-[270px] rounded-full max-sm:w-[145px] max-sm:h-[145px] max-sm:min-w-[145px] vr:min-w-[464px] vr:w-[464px] vr:h-[464px]"}/>
                    <div className={"flex flex-col gap-[20px] max-sm:gap-[10px] vr:gap-[40px]"}>
                        <div className={"flex flex-col"}>
                            <div className={"text-[30px] leading-[50px] font-bold text-[#524FA2] max-sm:text-2xl vr:text-[50px] vr:leading-normal"}>
                                {director?.[0]?.director_name}
                            </div>
                            <div className={"text-[24px] leading-[20px] text-[#211F23] max-sm:text-lg vr:text-[40px] vr:leading-normal"}>
                                {t.administration.schoolPrincipal}
                            </div>
                        </div>
                        <div className={"flex h-[60px] rounded-[20px] bg-white max-sm:bg-transparent max-sm:h-auto vr:max-h-none vr:h-auto"}>
                            <img src="/images/phone.svg" alt="" className={"w-[60px] h-[60px] rounded-l-[20px] max-sm:hidden "}/>
                            <div className={"flex flex-col pl-[10px] justify-center pr-[20px] max-sm:p-0"}>
                                <div className={"text-[14px] text-[#202020] max-sm:text-[14px] vr:text-[30px]"}>
                                    {t.administration.receptionPhones}:
                                </div>
                                <div className={"text-[18px] font-bold max-sm:text-[14px] vr:text-[30px]"}>
                                    {director?.[0]?.phone_number}
                                </div>
                            </div>
                        </div>
                        <div className={"flex h-[60px] rounded-[20px] bg-white max-sm:bg-transparent max-sm:h-auto vr:max-h-none"}>
                            <img src="/images/email.svg" alt="" className={"w-[60px] h-[60px] rounded-l-[20px]  max-sm:hidden"}/>
                            <div className={"flex flex-col pl-[10px] pr-[20px] justify-center max-sm:p-0"}>
                                <div className={"text-[14px] text-[#202020] max-sm:text-[14px] vr:text-[30px]"}>
                                    {t.administration.emailAddress}:
                                </div>
                                <div className={"text-[18px] font-bold max-sm:text-[14px] vr:text-[30px]"}>
                                    {director?.[0]?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col px-[35px] py-[50px] w-full gap-[30px] overflow-auto scrollbar-hide max-sm:p-[20px]"}>
                    <div className={"text-[#211F23] font-bold leading-[80%] text-[30px] max-sm:text-lg vr:text-[40px]"}>
                        {t.administration.schoolAdministration}
                    </div>
                    <div className={"flex flex-wrap gap-[50px] max-sm:flex-col max-sm:flex-nowrap max-sm:w-full vr:flex-col vr:flex-nowrap vr:w-full"}>
                        {
                            administration.map((item) => (
                                <div key={item.id} className={"flex flex-col gap-[20px] py-[15px] px-[20px] items-start rounded-[30px] w-[290px] h-auto bg-[#F9F8FD] max-sm:w-full max-sm:flex-row vr:w-full vr:flex-row" +
                                    " max-sm:p-[20px] max-sm:gap-[10px] vr:p-[40px]"}>
                                    <img src={item.administator_photo ? item.administator_photo : "/images/user.svg"} alt="" className={"w-[170px] h-[170px] rounded-full max-sm:w-[120px] max-sm:h-[120px] vr:w-[260px] vr:h-[260px]"}/>
                                    <div className={"flex flex-col gap-[10px] max-sm:gap-0"}>
                                        <div className={"text-[24px] leading-[24px] font-bold text-[#524FA2] max-sm:text-lg vr:text-[40px] vr:leading-none"}>
                                            {item.administrator_name}
                                        </div>
                                        <div className={"text-[18px] text-[#211F23] max-sm:text-[14px] vr:text-[30px]"}>
                                            {item.position}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Administration;