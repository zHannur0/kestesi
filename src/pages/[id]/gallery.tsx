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

    const handleBack = () => {
        if(curr) setSurr(null)
        else router.push(`/${id}/schoolInformation`);
    };
    useEffect(() => {
        id && dispatch(getPhotosThunk(id));
    }, [dispatch, id]);
    return (
        <MainLayout isMain={false} link={curr ? t.gallery.back : t.contacts.toSchoolPassport} handleClick={handleBack} page={`/${id}/gallery`} bg={"bg3"}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                {t.gallery.photoGallery}
            </h1>
                {
                    curr ? (
                        <div className={"rounded-[20px] relative"}
                             style={{
                                 backgroundImage: `url(${curr})`,
                                 width: "1720px",
                                 height: "814px",
                                 backgroundSize: "cover",
                                 backgroundPosition: "center",
                                 backgroundRepeat: "no-repeat"
                             }}>
                            <div className={"absolute w-[50%] left-[25%] bottom-[40px] p-[40px] rounded-[20px] text-white text-[14px] leading-[20.75px] flex items-center bg-black bg-opacity-[60%]"}>
                                {currText}
                            </div>
                        </div>
                    ) : (
                        <div className={"flex flex-wrap max-h-[910px] w-full gap-[20px] bg-white pt-[50px] px-[50px] pb-[30px] overflow-auto scrollbar-hide rounded-[40px]"}>
                            {
                                photos.map((item) => (
                                    <div key={item.id} className={"rounded-[20px] relative"} onClick={() => {
                                        setSurr(item?.slider_photo || null)
                                        setCurrText(item?.slider_name || null)
                                    }}
                                         style={{
                                             backgroundImage: `url(${item.slider_photo})`,
                                             width: "520px",
                                             height: "290px",
                                             backgroundSize: "cover",
                                             backgroundPosition: "center",
                                             backgroundRepeat: "no-repeat"
                                         }}>
                                        <div className={"absolute w-[90%] left-[5%] bottom-[20px] p-[10px] rounded-[20px] text-white text-[14px] leading-[20.75px] flex items-center bg-black bg-opacity-[60%]"}>
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