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
    const id = Number(router.query.id);
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    const dispatch = useAppDispatch();
    const photos = useTypedSelector((state) => state.schoolInfo.photos);
    const [curr,setSurr] = useState<string | null>(null)
    const handleBack = () => {
        if(curr) setSurr(null)
        else router.push(`/school/${id}/schoolInformation`);
    };
    useEffect(() => {
        id && dispatch(getPhotosThunk(id));
    }, [dispatch, id]);
    return (
        <MainLayout isMain={false} link={curr ? t.gallery.back : t.contacts.toSchoolPassport} handleClick={handleBack} page={`/school/${id}/gallery`}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                {t.gallery.photoGallery}
            </h1>
                {
                    curr ? (
                        <div>
                            <img src={curr} alt="" className={"w-full h-[814px] rounded-[40px]"}/>
                        </div>
                    ) : (
                        <div className={"flex flex-wrap max-h-[910px] w-full gap-[20px] bg-white pt-[50px] px-[50px] pb-[30px] overflow-auto scrollbar-hide rounded-[40px]"}>
                            {
                                photos.map((item) => (
                                    <img src={item.slider_photo} alt="" key={item.id} onClick={() => setSurr(item?.slider_photo || null)} className={"w-[520px] h-[290px] rounded-[20px]"}/>
                                ))
                            }
                        </div>

                    )
                }

        </MainLayout>
    )
}

export default Gallery;