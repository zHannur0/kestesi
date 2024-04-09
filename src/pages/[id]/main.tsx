import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolIdThunk,
  getSchoolPassportThunk,
  getSchoolThunk,
} from "@/store/thunks/school.thunk";
import QrComponent from "@/components/QrComponent";
import { en } from "@/locales/en";
import { kz } from "@/locales/kz";
import { ru } from "@/locales/ru";

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
  const schoolPassport = useTypedSelector(
    (state) => state.schoolInfo.schoolPassport,
  );
  const [schoolLang, setSchoolLang] = useState<string>();

  useEffect(() => {
      id && dispatch(getSchoolIdThunk(id));
      id && dispatch(getSchoolPassportThunk(id));
  }, [dispatch, id,]);

  useEffect(() => {
    if(router.locale === "kz") {
      setSchoolLang(school?.school_kz_name);
    }else if(router.locale === "en") {
      setSchoolLang(school?.school_eng_name);
    }else  {
      setSchoolLang(school?.school_ru_name);
    }
  },[school, router.locale])

  return (
    <MainLayout isMain={true} bg={"bg"}>
      <div className={"flex gap-[30px]"}>
        <div
            className="h-[420px] w-[1350px] relative bg-white rounded-[40px] flex justify-between items-center pr-[20px] pl-[50px]">
          <div className=" h-[100%] flex flex-col gap-[36px] py-[50px]">
            <div className="flex flex-col gap-[16px]">
              {
                schoolLang?.indexOf("№") != -1 ? (
                    <>
                      <div className=" text-neutral-800 text-3xl font-bold leading-[30px]">
                        {schoolLang
                                ?.substring(schoolLang?.indexOf(" ") + 1)
                                .charAt(0)
                                .toUpperCase() +
                            "" +
                            schoolLang?.substring(
                                schoolLang?.indexOf(" ") + 2,
                            )}
                      </div>
                      <div className="w-[325px] text-pink-600 text-5xl font-bold leading-[48px]">
                        {schoolLang?.split(" ")[0]}
                      </div>
                    </>
                ): (
                    <>
                      <div className=" text-neutral-800 text-3xl font-bold leading-[30px]">
                        {/*{schoolLang*/}
                        {/*        ?.substring(schoolLang?.indexOf(" ") + 1)*/}
                        {/*        .charAt(0)*/}
                        {/*        .toUpperCase() +*/}
                        {/*    "" +*/}
                        {/*    schoolLang?.substring(*/}
                        {/*        schoolLang?.indexOf(" ") + 2,*/}
                        {/*    )}*/}
                        {schoolLang}
                      </div>
                      <div
                          className="w-[310px] h-[120px] flex text-zinc-500 indent-0 text-2xl font-normal leading-[24px] items-end">
                        {cities
                            .find((city) => city.name === school?.region)
                            ?.[`${router.locale === "kz" ? "nameUpperKz" : router.locale === "ru" ? "nameUpper" : "nameEn"}`].toUpperCase()}
                      </div>
                    </>
                )
              }


            </div>
            <Link href={`/${id}/schoolInformation`}>
              <div
                  className={"btn-gradient-1 w-[300px] h-[70px] text-center text-indigo-800 text-4xl font-bold flex leading-[20px] justify-center items-center"}>
                {t.main.aboutSchool}
              </div>
            </Link>
          </div>
          <div>
            <div className="w-[900px] h-[380px]  justify-center items-center inline-flex">
              <img
                  className="w-[900px] h-[380px] rounded-[40px]"
                  src={schoolPassport?.[0]?.photo}
              />
            </div>
          </div>
        </div>
        <QrComponent/>
      </div>

      <div
          className="w-[1720px] h-[180px] bg-gradient-to-r from-purple-800 to-pink-600 rounded-[40px] flex justify-center items-center mt-[20px] hover:cursor-pointer"
          onClick={() => {
            router.push(`/${id}/scheduleTabs`);
          }}
      >
        <div className="h-[44px] text-white text-7xl font-bold leading-[30%] text-center">
          {t.main.schedule}
        </div>
      </div>
      <div className={"flex justify-between flex-wrap"}>
        {sidebar.map((item) => (
            <Link href={`/${router.query.id}/${item.link}`} key={item.id}>
              <div className="w-[560px] h-[130px] bg-white rounded-[40px] flex justify-center items-center  mt-[20px]">
                <div className="h-[10px] text-center text-indigo-800 text-4xl font-bold leading-[27%] tracking-normal">
                  {router.locale === "kz" ? item.typeKz : router.locale === "ru" ? item.type : item.typeEn}
                </div>
              </div>
            </Link>
        ))}
      </div>
    </MainLayout>
  );
};

interface IType {
  id: number;
  type: string; // Русский
  typeKz: string; // Казахский
  typeEn: string; // Английский
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
    typeKz: "Мектеп мақтанышы",
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
    type: "Меню",
    typeKz: "Ас мәзірі",
    typeEn: "Menu",
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
