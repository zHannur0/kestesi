import {useEffect, useState} from "react";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {ISchoolSocialMedia} from "@/types/assets.type";
import {getDirectorThunk, getSocialMediaThunk} from "@/store/thunks/school.thunk";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";


const QrComponent = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;

    const dispatch = useAppDispatch();
    const [isSelected, setIsSelected] = useState<string>("site");
    const socialMedia = useTypedSelector((state) => state.schoolInfo.socialMedia);
    const [facebook,setFacebook] = useState<ISchoolSocialMedia | null>(null);
    const [youtube,setYoutube] = useState<ISchoolSocialMedia | null>(null);
    const [insta,setInsta] = useState<ISchoolSocialMedia | null>(null);
    const [tg,setTg] = useState<ISchoolSocialMedia | null>(null);
    const [site,setSite] = useState<ISchoolSocialMedia | null>(null);

    useEffect(() => {
        id && dispatch(getDirectorThunk(id));
        id && dispatch(getSocialMediaThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(socialMedia) {
            setFacebook(socialMedia?.find((item) => item.type === "facebook") || null);
            setYoutube(socialMedia?.find((item) => item.type === "Youtube") || null);
            setInsta(socialMedia?.find((item) => item.type === "instagram") || null);
            setTg(socialMedia?.find((item) => item.type === "tgbot") || null);
            setSite(socialMedia?.find((item) => item.type === "website") || null);
        }
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

    }, [socialMedia,site, insta, facebook, insta, tg]);

    return(
        <div className={"flex flex-col p-[30px] bg-[#F9F8FD] w-[341px] h-[419px]  rounded-[40px]"}>
            <div className={"flex"}>
                {
                    site && (
                        <div onClick={() => setIsSelected("site")}
                             className={"flex items-center justify-center w-[53px] h-[53px] rounded-t-[10px]"}
                             style={{backgroundColor: isSelected === "site" ? "white" : "transparent"}}>
                            <img src={isSelected === "site" ? "/images/siteContact.svg" : "/images/siteBlack.svg"} alt=""
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
                            <img src={isSelected === "youtube" ? "/images/youtube.svg" : "/images/youtubeBlack.svg"} alt=""
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
            <div className={"p-[30px] w-[281px] h-[305px] flex flex-col gap-[30px] bg-white rounded-b-[20px] rounded-tr-[20px]"}>
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
                    </div>
                    <div className={"text-[20px] text-[#524FA2] leading-[80%]"}>
                        {
                            isSelected === "site" && site?.account_name?.split("/").slice(-2)
                        }
                        {
                            isSelected === "facebook" && facebook?.account_name?.split("/").slice(-2)
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
    )
}

export default QrComponent;