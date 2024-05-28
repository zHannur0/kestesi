import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ISchoolSocialMedia } from "@/types/assets.type";
import {getDirectorThunk, getSchoolIdThunk, getSocialMediaThunk} from "@/store/thunks/school.thunk";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { kz } from "@/locales/kz";
import { ru } from "@/locales/ru";
import { en } from "@/locales/en";
import Link from "next/link";

const QrComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const translations: any = { kz, ru, en };
    const t:typeof en= translations[router.locale || "kz"] || en;
    const school = useTypedSelector((state) => state.schoolInfo.schoolId);
    const socialMedia = useTypedSelector((state) => state.schoolInfo.socialMedia);
    const [isSelected, setIsSelected] = useState<string>("site");
    const [facebook, setFacebook] = useState<ISchoolSocialMedia | null>(null);
    const [youtube, setYoutube] = useState<ISchoolSocialMedia | null>(null);
    const [insta, setInsta] = useState<ISchoolSocialMedia | null>(null);
    const [tg, setTg] = useState<string>("https://t.me/Kestesi_bot");
    const [site, setSite] = useState<string>("link");
    const [android, setAndroid] = useState<string>("https://drive.google.com/drive/folders/1Ow2YKSWsl1VEvJmEprPz3Iegn51GoNCi?usp=sharing");

    useEffect(() => {
        if (router.isReady) {
            const id = String(router.query.id);
            if (id) {
                dispatch(getSchoolIdThunk(id));
                dispatch(getSocialMediaThunk(id));
            }
        }
    }, [router.isReady, dispatch, router.query.id]);

    useEffect(() => {
        setFacebook(socialMedia?.find((item) => item.type === "facebook") || null);
        setYoutube(socialMedia?.find((item) => item.type === "youtube") || null);
        setInsta(socialMedia?.find((item) => item.type === "instagram") || null);
    }, [socialMedia]);

    useEffect(() => {
        const socialMediaTypes = ['site', 'facebook', 'instagram', 'youtube', 'tg','android'];
        const socialMediaAvailable = socialMediaTypes.filter(type => {
            if (type === 'site') return site;
            if (type === 'facebook') return facebook;
            if (type === 'instagram') return insta;
            if (type === 'youtube') return youtube;
            if (type === 'tg') return tg;
            if (type === 'android') return android;
        }).filter(Boolean);

        let index = socialMediaAvailable.findIndex(socialMedia => socialMedia === isSelected);
        index = index === -1 ? 0 : index;

        const intervalId = setInterval(() => {
            if (socialMediaAvailable.length > 0) {
                index = (index + 1) % socialMediaAvailable.length;
                setIsSelected(socialMediaAvailable[index] || "site");
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [site, facebook, insta, youtube, tg, isSelected]);

    return (
        <div>
            <div className={"flex flex-col p-[30px] bg-[#F9F8FD] w-[341px] h-[419px] rounded-[40px] max-sm:hidden vr:hidden"}>
                <div className={"flex overflow-x-auto scrollbar-hide"}>
                    <div onClick={() => setIsSelected("site")}
                         className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                         style={{backgroundColor: isSelected === "site" ? "white" : "transparent"}}>
                        <img src={isSelected === "site" ? "/images/siteContact.svg" : "/images/siteBlack.svg"}
                             alt="site"
                             className={"w-[36px]"}/>
                    </div>
                    {facebook && (
                        <div onClick={() => setIsSelected("facebook")}
                             className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                             style={{backgroundColor: isSelected === "facebook" ? "white" : "transparent"}}>
                            <img src={isSelected === "facebook" ? "/images/facebook.svg" : "/images/facebookBlack.svg"}
                                 alt="facebook"
                                 className={"w-[36px]"}/>
                        </div>
                    )}
                    {insta && (
                        <div onClick={() => setIsSelected("instagram")}
                             className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                             style={{backgroundColor: isSelected === "instagram" ? "white" : "transparent"}}>
                            <img src={isSelected === "instagram" ? "/images/instagram.svg" : "/images/instaBlack.svg"}
                                 alt="instagram"
                                 className={"w-[36px]"}/>
                        </div>
                    )}
                    {youtube && (
                        <div onClick={() => setIsSelected("youtube")}
                             className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                             style={{backgroundColor: isSelected === "youtube" ? "white" : "transparent"}}>
                            <img src={isSelected === "youtube" ? "/images/youtube.svg" : "/images/youtubeBlack.svg"}
                                 alt="youtube"
                                 className={"w-[36px]"}/>
                        </div>
                    )}
                    <div onClick={() => setIsSelected("tg")}
                         className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                         style={{backgroundColor: isSelected === "tg" ? "white" : "transparent"}}>
                        <img src={isSelected === "tg" ? "/images/telegram.svg" : "/images/tgBlack.svg"} alt="tg"
                             className={"w-[36px]"}/>
                    </div>
                    <div onClick={() => setIsSelected('android')}
                         className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                         style={{backgroundColor: isSelected === "android" ? "white" : "transparent"}}>
                        <img src={isSelected === "android" ? "/images/android.svg" : "/images/androidBlack.svg"} alt="tg"
                             className={"w-[36px]"}/>
                    </div>
                </div>
                <div
                    className={"p-[30px] w-[281px] h-[305px] flex flex-col gap-[20px] bg-white rounded-b-[20px] rounded-tr-[20px]"}>
                    <div className={"text-2xl font-bold leading-[90%]"}>
                        {
                            isSelected === "site" && t.main.schoolInKestesiKz
                        }
                        {
                            isSelected === "facebook" && "Facebook:"
                        }
                        {
                            isSelected === "instagram" && "Instagram:"
                        }
                        {
                            isSelected === "youtube" && "Youtube:"
                        }
                        {
                            isSelected === "tg" && "Telegram:"
                        }
                        {
                            isSelected === "android" && t.main.androidApp
                        }
                    </div>
                    {
                        isSelected === "site" && (
                            <img src={school?.qrcode} alt="site qr code" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    {
                        isSelected === "facebook" && (
                            <img src={facebook?.qr_code} alt="facebook qr code" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    {
                        isSelected === "instagram" && (
                            <img src={insta?.qr_code} alt="instagram qr code" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    {
                        isSelected === "youtube" && (
                            <img src={youtube?.qr_code} alt="youtube qr code" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    {
                        isSelected === "tg" && (
                            <img src="/images/qrBot.svg" alt="tg qr code" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    {
                        isSelected === "android" && (
                            <img src="/images/appQR.svg" alt="android qr" className={"w-[160px] h-[150px]"} />
                        )
                    }
                    <div className={"flex flex-col gap-[10px]"}>
                        <div className={"text-[20px] text-[#524FA2] leading-[80%]"}>
                            {
                                isSelected === "site" && t.main.youCanSee
                            }
                            {/*{*/}
                            {/*    isSelected === "facebook" && facebook?.account_name?.split("/").slice(-2).join("/")*/}
                            {/*}*/}
                            {
                                isSelected === "instagram" && insta?.account_name?.split("/").slice(-2)
                            }
                            {
                                isSelected === "youtube" && youtube?.account_name?.split("/").slice(-2)
                            }
                            {
                                isSelected === "tg" && "@kestesi_bot"
                            }
                            {
                                isSelected === "android" && t.main.installing
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"sm:hidden w-full py-[10px]  px-[20px] vr:px-[85px] vr:py-[40px] flex justify-between bg-white rounded-[10px] items-center gap-[50px] overflow-auto scrollbar-hide vr:flex"}>
                <Link href={`https://my.kestesi.kz/${router.query.id}}` || ""}>
                    <img src="/images/siteContact.svg" alt="site link" className={"w-[40px] h-[40px] vr:w-[88px] vr:h-[88px]"} />
                </Link>
                {facebook?.account_name && <Link href={facebook?.account_name || ""}>
                    <img src="/images/facebook.svg" alt="facebook link" className={"w-[40px] h-[40px] vr:w-[88px] vr:h-[88px]"} />
                </Link>}
                {insta?.account_name && <Link href={insta?.account_name || ""}>
                    <img src="/images/instagram.svg" alt="instagram link" className={"w-[40px] h-[40px] vr:w-[88px] vr:h-[88px]"} />
                </Link>}
                {youtube?.account_name && <Link href={youtube?.account_name || ""}>
                    <img src="/images/youtube.svg" alt="youtube link" className={"w-[40px] vr:w-[88px]"} />
                </Link>}
                <Link href={tg || ""}>
                    <img src="/images/telegram.svg" alt="tg link" className={"w-[40px] h-[40px] vr:w-[88px] vr:h-[88px]"} />
                </Link>
                <Link href={android || ""}>
                    <img src="/images/android.svg" alt="android link" className={"w-[40px] h-[40px] vr:w-[88px] vr:h-[88px]"} />
                </Link>
            </div>
        </div>
    );
}

export default QrComponent;
