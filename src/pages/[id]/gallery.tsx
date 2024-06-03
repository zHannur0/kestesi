import exp from "node:constants";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {getDirectorThunk, getPhotosThunk, getSocialMediaThunk} from "@/store/thunks/school.thunk";
import MainLayout from "@/layouts/MainLayout";

const Gallery = () => {
    const router = useRouter();
    const id = String(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const dispatch = useAppDispatch();
    const photos = useTypedSelector((state) => state.schoolInfo.photos);
    const [curr,setSurr] = useState<string | null>(null)
    const [currText,setCurrText] = useState<string | null>(null)
    const [clickable, setClickable] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setClickable(window.innerWidth > 640); // Предположим, что 640px - это breakpoint для max-sm
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBack = () => {
        if(curr) setSurr(null)
        else router.push(`/${id}/schoolInformation`);
    };
    useEffect(() => {
        id && dispatch(getPhotosThunk(id));
    }, [dispatch, id]);

    const handleImageClick = (photoUrl: string, photoName:string) => {
        if (!clickable) return;
        setSurr(photoUrl);
        setCurrText(photoName);
    };

    return (
        <MainLayout isMain={false} link={curr ? t.gallery.back : t.contacts.toSchoolPassport} handleClick={handleBack} page={`/${id}/gallery`} bg={"bg3"}>
            <div className={"flex justify-between mb-[50px] max-sm:mb-[20px]"}>
                <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] max-sm:text-2xl vr:text-[50px]">
                    {t.gallery.photoGallery}
                </h1>
                {
                    curr && (
                        <img src="/images/noBgX.svg" alt="" className={"w-[50px] h-[50px] cursor-pointer"}
                             onClick={() => setSurr(null)}/>
                    )
                }
            </div>
            {
                curr ? (
                    <div className={"rounded-[20px] relative w-full h-[814px]"}>
                            <img src={curr} className={"w-[100%] h-[100%] rounded-[20px]"} alt=""/>
                            <div className={"absolute w-[50%] left-[25%] bottom-[40px] p-[40px] rounded-[20px] text-white text-[24px] leading-[20.75px] flex items-center bg-black bg-opacity-[60%] vr:text-[30px]"}>
                                {currText}
                            </div>
                        </div>
                    ) : (
                        <div className={"flex flex-wrap max-h-[910px] w-full gap-[20px] bg-white pt-[50px] px-[50px] pb-[30px] overflow-auto scrollbar-hide rounded-[40px] " +
                            " max-sm:gap-[10px] max-sm:p-[10px] max-sm:rounded-[20px] vr:max-h-[1600px]"}>
                            {
                                photos.map((item) => (
                                    <div key={item.id} className={"rounded-[20px] relative cursor-pointer w-[520px] h-[290px] max-sm:w-full max-sm:h-[250px] vr:w-full vr:h-[540px]"}
                                         onClick={() =>
                                             handleImageClick(item?.slider_photo || "", item?.slider_name || "")
                                    }
                                         style={{
                                             backgroundImage: `url(${item.slider_photo})`,
                                             backgroundSize: "cover",
                                             backgroundPosition: "center",
                                             backgroundRepeat: "no-repeat"
                                         }}>
                                        <div className={"absolute w-[90%] left-[5%] bottom-[20px] py-[4px] px-[20px] rounded-[10px] text-white text-[14px] flex items-center bg-black bg-opacity-[60%]" +
                                            " max-sm:rounded-[10px] vr:text-[30px]"}>
                                            {item.slider_name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    )
                }

        </MainLayout>
    )
}

export default Gallery;