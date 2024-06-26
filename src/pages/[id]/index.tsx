import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolIdThunk,
  getSchoolPassportThunk,
  getSchoolThunk, getSliderThunk,
} from "@/store/thunks/school.thunk";
import QrComponent from "@/components/QrComponent";
import { en } from "@/locales/en";
import { kz } from "@/locales/kz";
import { ru } from "@/locales/ru";
import {ISlider} from "@/types/assets.type";
import Slider from "@/components/Slider/Slider";

const MainPage = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const dispatch = useAppDispatch();
  const school = useTypedSelector((state) => state.schoolInfo.schoolId);
  const slider = useTypedSelector((state) => state.schoolInfo.slider);
  const schoolPassport = useTypedSelector(
    (state) => state.schoolInfo.schoolPassport,
  );
  const [currSlider, setCurrSlider] = useState<string[]>([]);

  const [schoolLang, setSchoolLang] = useState<string>();
  useEffect(() => {
    if (router.isReady) {
      const id = String(router.query.id);
      if (id) {
        dispatch(getSchoolIdThunk(id));
        dispatch(getSchoolPassportThunk(id));
        dispatch(getSliderThunk(id));
      }
    }
  }, [router.isReady, dispatch, router.query.id]);

  useEffect(() => {
    if(router.locale === "kz") {
      setSchoolLang(school?.school_kz_name);
    }else if(router.locale === "en") {
      setSchoolLang(school?.school_eng_name);
    }else  {
      setSchoolLang(school?.school_ru_name);
    }
  },[school, router.locale]);

  useEffect(() => {
    if (slider && slider[0]) {
      let arr: any[] = [];
      for (let i: number = 1; i < 11; i++) {
        const photoKey = `photo${i}` as keyof ISlider;
        if (slider[0][photoKey]) {
          arr.push(slider[0][photoKey]);
        }
      }
      setCurrSlider(arr);
    }
  }, [slider]);

  return (
    <MainLayout isMain={true} bg={"bg"}>
      <div className={"flex gap-[30px] max-sm:flex-col max-sm:gap-[0px] vr:flex-col vr-gap-[10px]" }>
        <div
            className="h-[420px] w-[1350px] relative bg-white rounded-[40px] flex justify-between items-center pr-[20px] pl-[50px] gap-[10px]
            max-sm:h-auto max-sm:w-full max-sm:px-[20px] max-sm:pt-[20px] max-sm:pb-[0px]
            max-sm:flex-col max-sm:gap-[20px] max-sm:rounded-[20px] vr:h-auto vr:w-full vr:px-[20px] vr:pt-[20px] vr:pb-[0px]
          vr:flex-col vr:gap-[20px] vr:rounded-[20px]">
          <div className=" h-[100%] flex flex-col justify-between gap-[36px] py-[50px]
          max-sm:py-0 max-sm:px-0 max-sm:items-start max-sm:w-[100%] max-sm:gap-[10px]
           vr:py-0 vr:px-0 vr:items-start vr:w-[100%] vr:gap-[10px]">
            <div className="flex flex-col gap-[16px] max-sm:flex-row max-sm:justify-start vr:flex-row vr:justify-start">
              {
                schoolLang ? (
                    schoolLang?.indexOf("№") != -1 ? (
                        <>
                          <div className="text-neutral-800 text-3xl font-bold leading-[30px] max-sm:text-2xl vr:text-[50px] vr:leading-none">
                            {schoolLang
                                    ?.substring(schoolLang?.indexOf(" ") + 1)
                                    .charAt(0)
                                    .toUpperCase() +
                                "" +
                                schoolLang?.substring(
                                    schoolLang?.indexOf(" ") + 2,
                                )}
                          </div>
                          <div className="w-[325px] text-pink-600 text-5xl font-bold leading-[48px] max-sm:w-auto max-sm:text-3xl vr:w-auto vr:text-[64px] vr:leading-none">
                            {schoolLang?.split(" ")[0]}
                          </div>
                        </>
                    ) : (
                        <>
                          <div className=" text-neutral-800 text-3xl font-bold leading-[30px] max-sm:text-2xl vr:text-[50px] vr:leading-none">
                            {schoolLang}
                          </div>
                        </>
                    )
                ) : (
                    <div></div>
                )
              }
            </div>
            <div
                className=" flex text-zinc-500 indent-0 text-2xl font-normal leading-[24px] items-end
                max-sm:text-[18px] vr:text-[38px] vr:leading-none">
              {cities
                  .find((city) => city.name === school?.region)
                  ?.[`${router.locale === "kz" ? "nameUpperKz" : router.locale === "ru" ? "nameUpper" : "nameEn"}`].toUpperCase()}
            </div>
            <Link href={`/${id}/schoolInformation`}>
              <div
                  className={"btn-gradient-1 w-[300px] h-[70px] text-center text-indigo-800 text-4xl font-bold flex leading-[20px] justify-center items-center" +
                      " max-sm:bg-none max-sm:w-auto max-sm:text-[18px] max-sm:h-auto max-sm:leading-[24px] vr:bg-none vr:w-auto vr:text-[38px] vr:h-auto vr:leading-[50px] vr:mt-2"}>
                {t.main.aboutSchool}
              </div>
            </Link>
          </div>
            <div className="w-[900px] h-[380px] min-w-[900px] justify-center items-center inline-flex
            max-sm:w-[100vw] max-sm:min-w-0 max-sm:h-[210px] max-sm:rounded-0  vr:w-[100vw] vr:h-[450px] vr:rounded-0">
              <Slider slides={currSlider} time={10000}/>
            </div>

        </div>
        <QrComponent/>
      </div>
      <div
          className="w-[full] h-[180px] bg-gradient-to-r from-purple-800 to-pink-600 rounded-[40px] flex justify-center items-center mt-[20px] hover:cursor-pointer
          max-sm:h-[91px] max-sm:rounded-[20px] vr:text-4xl"
          onClick={() => {
            router.push(`/${id}/scheduleTabs`);
          }}
      >
        <div className="h-[44px] text-white text-7xl font-bold leading-[30%] text-center max-sm:text-4xl">
          {t.main.schedule}
        </div>
      </div>
      <div className={"flex justify-between flex-wrap w-[100%] max-sm:flex-col vr:flex-col"}>
        {sidebar.map((item) => (
            <Link href={`/${router.query.id}/${item.link}`} key={item.id}>
              <div className="w-[560px] h-[130px] bg-white rounded-[40px] flex justify-center items-center  mt-[20px]
              max-sm:w-full  max-sm:rounded-[20px]  max-sm:h-[60px] max-sm:mt-[10px]
              max-sm:text-2xl  text-center text-indigo-800 text-4xl font-bold leading-[27%] max-sm:leading-[24px] tracking-normal
              vr:w-full  vr:rounded-[20px]  vr:h-[130px] vr:mt-[10px]
            vr:text-[50px]  vr:leading-[24px]">
                  {router.locale === "kz" ? item.typeKz : router.locale === "ru" ? item.type : item.typeEn}
              </div>
            </Link>
        ))}
      </div>
    </MainLayout>
  );
};

interface IType {
  id: number;
  type: string;
  typeKz: string;
  typeEn: string;
  link: string;
}

const sidebar: IType[] = [
  {
    id: 1,
    type: "Преподаватели",
    typeKz: "Мұғалімдер",
    typeEn: "Teachers",
    link: "teachers",
  },
  {
    id: 2,
    type: "Гордость школы",
    typeKz: "Мектеп мақтаныштары",
    typeEn: "School Pride",
    link: "proudOfSchool/1",
  },
  {
    id: 3,
    type: "Новости",
    typeKz: "Жаңалықтар",
    typeEn: "News",
    link: "news",
  },
  {
    id: 4,
    type: "Кружки",
    typeKz: "Үйірмелер",
    typeEn: "Clubs",
    link: "sections",
  },
  {
    id: 5,
    type: "Меню столовой",
    typeKz: "Ас мәзірі",
    typeEn: "School cafeteria menu",
    link: "menu",
  },
  {
    id: 6,
    type: "Карта школы",
    typeKz: "Мектеп картасы",
    typeEn: "School Map",
    link: "map",
  },
];


const cities = [
  {
    name: "almaty",
    nameUpper: "Алматы",
    nameUpperKz: "Алматы",
    nameEn: "Almaty",
  },
  {
    name: "astana",
    nameUpper: "Астана",
    nameUpperKz: "Астана",
    nameEn: "Astana",
  },
  {
    name: "shymkent",
    nameUpper: "Шымкент",
    nameUpperKz: "Шымкент",
    nameEn: "Shymkent",
  },
  {
    name: "abay_oblast",
    nameUpper: "Абайская область",
    nameUpperKz: "Абай облысы",
    nameEn: "Abay Region",
  },
  {
    name: "akmolinsk_oblast",
    nameUpper: "Акмолинская область",
    nameUpperKz: "Ақмола облысы",
    nameEn: "Akmola Region",
  },
  {
    name: "aktobe_oblast",
    nameUpper: "Актюбинская область",
    nameUpperKz: "Ақтөбе облысы",
    nameEn: "Aktobe Region",
  },
  {
    name: "almaty_region",
    nameUpper: "Алматинская область",
    nameUpperKz: "Алматы облысы",
    nameEn: "Almaty Region",
  },
  {
    name: "atyrau_oblast",
    nameUpper: "Атырауская область",
    nameUpperKz: "Атырау облысы",
    nameEn: "Atyrau Region",
  },
  {
    name: "east_kazakhstan_oblast",
    nameUpper: "Восточно-Казахстанская область",
    nameUpperKz: "Шығыс-Қазақстан облысы",
    nameEn: "East Kazakhstan Region",
  },
  {
    name: "zhambyl_oblast",
    nameUpper: "Жамбылская область",
    nameUpperKz: "Жамбыл облысы",
    nameEn: "Zhambyl Region",
  },
  {
    name: "west_kazakhstan_oblast",
    nameUpper: "Западно-Казахстанская область",
    nameUpperKz: "Батыс-Қазақстан облысы",
    nameEn: "West Kazakhstan Region",
  },
  {
    name: "zhetysu_oblast",
    nameUpper: "Жетысуская область",
    nameUpperKz: "Жетісу облысы",
    nameEn: "Zhetysu Region",
  },
  {
    name: "karaganda_oblast",
    nameUpper: "Карагандинская область",
    nameUpperKz: "Қарағанды облысы",
    nameEn: "Karaganda Region",
  },
  {
    name: "kostanay_oblast",
    nameUpper: "Костанайская область",
    nameUpperKz: "Қостанай облысы",
    nameEn: "Kostanay Region",
  },
  {
    name: "kyzylorda_oblast",
    nameUpper: "Кызылординская область",
    nameUpperKz: "Қызылорда облысы",
    nameEn: "Kyzylorda Region",
  },
  {
    name: "mangystau_oblast",
    nameUpper: "Мангистауская область",
    nameUpperKz: "Маңғыстау облысы",
    nameEn: "Mangystau Region",
  },
  {
    name: "pavlodar_oblast",
    nameUpper: "Павлодарская область",
    nameUpperKz: "Павлодар облысы",
    nameEn: "Pavlodar Region",
  },
  {
    name: "north_kazakhstan_oblast",
    nameUpper: "Северо-Казахстанская область",
    nameUpperKz: "Солтүстік Қазақстан облысы",
    nameEn: "North Kazakhstan Region",
  },
  {
    name: "turkestan_oblast",
    nameUpper: "Туркестанская область",
    nameUpperKz: "Түркістан облысы",
    nameEn: "Turkestan Region",
  },
  {
    name: "ulytau_oblast",
    nameUpper: "Улытауская область",
    nameUpperKz: "Ұлытау облысы",
    nameEn: "Ulytau Region",
  },
];

export default MainPage;
