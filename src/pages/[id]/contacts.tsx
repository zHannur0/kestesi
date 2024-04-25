import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getAdministrationThunk, getDirectorThunk, getNewsThunk, getSocialMediaThunk} from "@/store/thunks/school.thunk";
import ContactBlock from "@/components/blocks/ContactsBlock";
import {ISchoolSocialMedia} from "@/types/assets.type";
import QrBlock from "@/components/blocks/QrBlock";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const Contacts = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const dispatch = useAppDispatch();
    const director = useTypedSelector((state) => state.schoolInfo.director);
    const socialMedia = useTypedSelector((state) => state.schoolInfo.socialMedia);
    const [facebook,setFacebook] = useState<ISchoolSocialMedia | null>(null);
    const [youtube,setYoutube] = useState<ISchoolSocialMedia | null>(null);
    const [insta,setInsta] = useState<ISchoolSocialMedia | null>(null);
    const [tg,setTg] = useState<ISchoolSocialMedia | null>(null);
    const [site,setSite] = useState<ISchoolSocialMedia | null>(null);

    useEffect(() => {
        if (router.isReady) {
            const id = String(router.query.id);
            if (id) {
                dispatch(getDirectorThunk(id));
                dispatch(getSocialMediaThunk(id));
            }
        }
    }, [router.isReady, dispatch, router.query.id]);


    useEffect(() => {
        if(socialMedia) {
            setFacebook(socialMedia?.find((item) => item.type === "facebook") || null);
            setYoutube(socialMedia?.find((item) => item.type === "youtube") || null);
            setInsta(socialMedia?.find((item) => item.type === "instagram") || null);
            setTg(socialMedia?.find((item) => item.type === "tgbot") || null);
            setSite(socialMedia?.find((item) => item.type === "website") || null);
        }
    }, [socialMedia]);
    const handleBack = () => {
        router.push(`/${id}/schoolInformation`);
    };

    return (
        <MainLayout isMain={false} link={t.contacts.toSchoolPassport} handleClick={handleBack} page={`/${id}/contacts`} bg={"bg3"}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px]">
                {t.contacts.contacts}
            </h1>
            <div className={"bg-white py-[40px] px-[60px] max-sm:p-[20px] max-sm:gap-[20px] max-sm:rounded-[20px] gap-[60px] flex flex-col rounded-[40px] w-full min-h-[860px]"}>
                <div className={"flex flex-col gap-[30px] max-sm:gap-[20px]"}>
                    <div className={"text-[30px] font-bold leading-[80%] max-sm:text-lg"}>
                        {t.contacts.waysToConnect}
                    </div>
                    <div className={"flex gap-[20px] max-sm:flex-col max-sm:gap-[10px]"}>
                        {
                            <ContactBlock img={"/images/phoneContact.svg"} type={`${t.contacts.receptionPhones}:`}
                                          content={director?.[0]?.phone_number}/>
                        }
                        {
                            <ContactBlock img={"/images/emailContact.svg"} type={`${t.contacts.emailAddress}:`}
                                          content={director?.[0]?.email}/>
                        }
                        {
                            <ContactBlock img={"/images/siteContact.svg"} type={`${t.contacts.website}:`}
                                          content={site?.account_name}/>
                        }
                    </div>
                </div>
                <div className={"flex flex-col gap-[30px] max-sm:gap-[20px]"}>
                    <div className={"text-[30px] font-bold leading-[80%] max-sm:text-lg"}>
                        {t.contacts.socialNetworks}
                    </div>
                    <div className={"flex gap-[20px] max-sm:gap-[10px] max-sm:flex-col"}>
                        {
                            facebook &&
                            <QrBlock img={"/images/facebook.svg"} type={"Facebook"} qr={facebook.qr_code} content={facebook.account_name}/>
                        }
                        {
                            insta &&
                            <QrBlock img={"/images/instagram.svg"} type={"Instagram"} qr={insta.qr_code} content={insta.account_name}/>

                        }
                        {
                            youtube &&
                            <QrBlock img={"/images/youtube.svg"} type={"Youtube"} qr={youtube.qr_code} content={youtube.account_name}/>
                        }
                    </div>

                </div>
            </div>

        </MainLayout>
    );
}

export default Contacts;