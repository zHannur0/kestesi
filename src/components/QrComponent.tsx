import {useEffect, useState} from "react";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {ISchoolSocialMedia} from "@/types/assets.type";
import {getDirectorThunk, getSocialMediaThunk} from "@/store/thunks/school.thunk";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Link from "next/link";


const QrComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const translations: any = { kz, ru, en };
    const t = translations[router.locale || "kz"] || en;
    const socialMedia = useTypedSelector((state) => state.schoolInfo.socialMedia);
    const [isSelected, setIsSelected] = useState<string>("site");
    const [facebook, setFacebook] = useState<ISchoolSocialMedia | null>(null);
    const [youtube, setYoutube] = useState<ISchoolSocialMedia | null>(null);
    const [insta, setInsta] = useState<ISchoolSocialMedia | null>(null);
    const [tg, setTg] = useState<ISchoolSocialMedia | null>(null);
    const [site, setSite] = useState<ISchoolSocialMedia | null>(null);

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
        setFacebook(socialMedia?.find((item) => item.type === "facebook") || null);
        setYoutube(socialMedia?.find((item) => item.type === "youtube") || null);
        setInsta(socialMedia?.find((item) => item.type === "instagram") || null);
        setTg(socialMedia?.find((item) => item.type === "tgbot") || null);
        setSite(socialMedia?.find((item) => item.type === "site") || null);
        if(site) {
            setIsSelected("site");
        }else {
            if(facebook) {
                setIsSelected("facebook");
            }else {
                if(insta) {
                    setIsSelected("instagram");
                } else {
                    if(youtube) setIsSelected("youtube")
                    else setIsSelected("tg")
                }
            }
        }
    }, [socialMedia,site, facebook, insta, youtube, tg]);

    useEffect(() => {
        const socialMediaTypes = ['site', 'facebook', 'instagram', 'youtube', 'tg'];
        const socialMediaAvailable = socialMediaTypes.filter(type => {
            if (type === 'site') return site;
            if (type === 'facebook') return facebook;
            if (type === 'instagram') return insta;
            if (type === 'youtube') return youtube;
            if (type === 'tg') return tg;
        }).map(type => {
            if (type === 'site') return site;
            if (type === 'facebook') return facebook;
            if (type === 'instagram') return insta;
            if (type === 'youtube') return youtube;
            if (type === 'tg') return tg;
        }).filter(Boolean);

        let index = socialMediaAvailable.findIndex(socialMedia => socialMedia?.type === isSelected);
        index = index === -1 ? 0 : index;

        const intervalId = setInterval(() => {
            if (socialMediaAvailable.length > 0) {
                index = (index + 1) % socialMediaAvailable.length;
                setIsSelected(socialMediaAvailable[index]?.type || "site");
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [site, facebook, insta, youtube, tg, isSelected]);


    return(
        <div>
            <div className={"flex flex-col p-[30px] bg-[#F9F8FD] w-[341px] h-[419px]  rounded-[40px] max-sm:hidden"}>
                <div className={"flex"}>
                    {
                        site && (
                            <div onClick={() => setIsSelected("site")}
                                 className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                                 style={{backgroundColor: isSelected === "site" ? "white" : "transparent"}}>
                                <img src={isSelected === "site" ? "/images/siteContact.svg" : "/images/siteBlack.svg"}
                                     alt=""
                                     className={"w-[36px]"}/>
                            </div>
                        )
                    }
                    {
                        facebook && (
                            <div onClick={() => setIsSelected("facebook")}
                                 className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                                 style={{backgroundColor: isSelected === "facebook" ? "white" : "transparent"}}>
                                <img src={isSelected === "facebook" ? "/images/facebook.svg" : "/images/facebookBlack.svg"}
                                     alt=""
                                     className={"w-[36px]"}/>
                            </div>
                        )
                    }
                    {
                        insta && (
                            <div onClick={() => setIsSelected("instagram")}
                                 className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                                 style={{backgroundColor: isSelected === "instagram" ? "white" : "transparent"}}>
                                <img src={isSelected === "instagram" ? "/images/instagram.svg" : "/images/instaBlack.svg"}
                                     alt=""
                                     className={"w-[36px]"}/>
                            </div>
                        )
                    }
                    {
                        youtube && (
                            <div onClick={() => setIsSelected("youtube")}
                                 className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                                 style={{backgroundColor: isSelected === "youtube" ? "white" : "transparent"}}>
                                <img src={isSelected === "youtube" ? "/images/youtube.svg" : "/images/youtubeBlack.svg"}
                                     alt=""
                                     className={"w-[36px]"}/>
                            </div>
                        )
                    }
                    {
                        tg && (
                            <div onClick={() => setIsSelected("tg")}
                                 className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                                 style={{backgroundColor: isSelected === "tg" ? "white" : "transparent"}}>
                                <img src={isSelected === "tg" ? "/images/telegram.svg" : "/images/tgBlack.svg"} alt=""
                                     className={"w-[36px]"}/>
                            </div>
                        )
                    }
                </div>
                <div
                    className={"p-[30px] w-[281px] h-[305px] flex flex-col gap-[30px] bg-white rounded-b-[20px] rounded-tr-[20px]"}>
                    <div className={"text-2xl font-bold leading-[28%]"}>
                        {t.main.schoolInKestesiKz}
                    </div>
                    {
                        isSelected === "site" && (
                            <img src={site?.qr_code} alt="" className={"w-[160px] h-[150px]"}/>
                        )
                    }
                    {
                        isSelected === "facebook" && (
                            <img src={facebook?.qr_code} alt="" className={"w-[160px] h-[150px]"}/>
                        )
                    }
                    {
                        isSelected === "instagram" && (
                            <img src={insta?.qr_code} alt="" className={"w-[160px] h-[150px]"}/>
                        )
                    }
                    {
                        isSelected === "youtube" && (
                            <img src={youtube?.qr_code} alt="" className={"w-[160px] h-[150px]"}/>
                        )
                    }
                    {
                        isSelected === "tg" && (
                            <img src={tg?.qr_code} alt="" className={"w-[160px] h-[150px]"}/>
                        )
                    }
                    <div className={"flex flex-col gap-[10px]"}>
                        <div className={"text-[20px] text-[#211F23] leading-[28%] tracking-[-0.4px]"}>
                            {
                                isSelected === "site" && "Сайт школы:"
                            }
                            {
                                isSelected === "facebook" && "Facebook"
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
                        </div>
                        <div className={"text-[20px] text-[#524FA2] leading-[80%]"}>
                            {
                                isSelected === "site" && site?.account_name?.split("/").slice(-2)
                            }
                            {
                                isSelected === "instagram" && insta?.account_name?.split("/").slice(-2)
                            }
                            {
                                isSelected === "youtube" && youtube?.account_name?.split("/").slice(-2)
                            }
                            {
                                isSelected === "tg" && tg?.account_name?.split("/").slice(-2)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"sm:hidden w-full py-[10px] px-[20px] flex justify-center bg-white rounded-[10px] items-center gap-[50px] overflow-auto scrollbar-hide"}>
                {site?.account_name && <Link href={site?.account_name || ""}>
                    <img src="/images/siteContact.svg" alt="" className={"w-[40px] h-[40px]"}/>
                </Link>}
                {
                    facebook?.account_name &&   <Link href={facebook?.account_name || ""}>
                        <img src="/images/facebook.svg" alt="" className={"w-[40px] h-[40px]"}/>
                    </Link>
                }
                {
                    insta?.account_name &&  <Link href={insta?.account_name || ""}>
                        <img src="/images/instagram.svg" alt="" className={"w-[40px] h-[40px]"}/>
                    </Link>
                }
                {
                    youtube?.account_name &&  <Link href={youtube?.account_name || ""}>
                        <img src="/images/youtube.svg" alt="" className={"w-[40px]"}/>

                    </Link>
                }
                {
                    tg?.account_name &&
                    <Link href={tg?.account_name || ""}>
                        <img src="/images/telegram.svg" alt="" className={"w-[40px] h-[40px]"}/>
                    </Link>
                }
                <Link href={""}>
                    <img src="/images/android.svg" alt="" className={"w-[40px] h-[40px]"}/>
                </Link>
            </div>
        </div>

    )
}

export default QrComponent;