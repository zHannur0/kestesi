import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
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
  const id = Number(router.query.id);
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

  useEffect(() => {
    id && dispatch(getSchoolIdThunk(id));
    id && dispatch(getSchoolPassportThunk(id));
  }, [dispatch, id]);

  console.log(schoolPassport);

  return (
    <MainLayout isMain={true}>
      <div className={"flex gap-[30px]"}>
        <div
            className="h-[420px] w-[1350px] relative bg-white rounded-[40px] flex justify-between items-center pr-[20px] pl-[50px]">
          <div className=" h-[100%] flex flex-col gap-[36px] py-[50px]">
            <div className="flex flex-col gap-[16px]">
              <div className=" text-neutral-800 text-3xl font-bold leading-[30px]">
                {school?.school_kz_name
                        ?.substring(school?.school_kz_name?.indexOf(" ") + 1)
                        .charAt(0)
                        .toUpperCase() +
                    "" +
                    school?.school_kz_name?.substring(
                        school?.school_kz_name?.indexOf(" ") + 2,
                    )}
              </div>
              <div className="w-[325px] text-pink-600 text-5xl font-bold leading-[48px]">
                {school?.school_kz_name?.split(" ")[0]}
              </div>
              <div
                  className="w-[310px] h-[120px] flex text-zinc-500 indent-0 text-2xl font-normal leading-[24px] items-end">
                {cities
                    .find((city) => city.name === school?.region)
                    ?.nameUpper.toUpperCase()}
              </div>
            </div>
            <Link href={`/school/${id}/schoolInformation`}>
              <div className="text-center text-indigo-800 text-4xl font-bold border-2 border-[#5D49A0] rounded-[20px] w-[300px] h-[70px] flex leading-[20px]  justify-center items-center">
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
            router.push(`/school/${id}/scheduleTabs`);
          }}
      >
        <div className="h-[44px] text-white text-7xl font-bold leading-[30%] text-center">
          {t.main.schedule}
        </div>
      </div>
      <div className={"flex justify-between flex-wrap"}>
        {sidebar.map((item) => (
            <Link href={`/school/${router.query.id}/${item.link}`} key={item.id}>
              <div className="w-[560px] h-[130px] bg-white rounded-[40px] flex justify-center items-center  mt-[20px]">
                <div className="h-[10px] text-center text-indigo-800 text-4xl font-bold leading-[27%] tracking-normal">
                  {item.type}
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
  },
  {
    name: "astana",
    nameUpper: "Астана",
    nameUpperKz: "Астана",
  },
  {
    name: "shymkent",
    nameUpper: "Шымкент",
    nameUpperKz: "Шымкент",
  },
  {
    name: "abay_oblast",
    nameUpper: "Абайская область",
    nameUpperKz: "Абай облысы",
  },
  {
    name: "akmolinsk_oblast",
    nameUpper: "Акмолинская область",
    nameUpperKz: "Ақмола облысы",
  },
  {
    name: "aktobe_oblast",
    nameUpper: "Актюбинская область",
    nameUpperKz: "Ақтөбе облысы",
  },
  {
    name: "almaty_region",
    nameUpper: "Алматинская область",
    nameUpperKz: "Алматы облысы",
  },
  {
    name: "atyrau_oblast",
    nameUpper: "Атырауская область",
    nameUpperKz: "Атырау облысы",
  },
  {
    name: "east_kazakhstan_oblast",
    nameUpper: "Восточно-Казахстанская область",
    nameUpperKz: "Шығыс-Қазақстан облысы",
  },
  {
    name: "zhambyl_oblast",
    nameUpper: "Жамбылская область",
    nameUpperKz: "Жамбыл облысы",
  },
  {
    name: "west_kazakhstan_oblast",
    nameUpper: "Западно-Казахстанская область",
    nameUpperKz: "Батыс-Қазақстан облысы",
  },
  {
    name: "zhetysu_oblast",
    nameUpper: "Жетысуская область",
    nameUpperKz: "Жетісу облысы",
  },
  {
    name: "karaganda_oblast",
    nameUpper: "Карагандинская область",
    nameUpperKz: "Қарағанды облысы",
  },
  {
    name: "kostanay_oblast",
    nameUpper: "Костанайская область",
    nameUpperKz: "Қостанай облысы",
  },
  {
    name: "kyzylorda_oblast",
    nameUpper: "Кызылординская область",
    nameUpperKz: "Қызылорда облысы",
  },
  {
    name: "mangystau_oblast",
    nameUpper: "Мангистауская область",
    nameUpperKz: "Маңғыстау облысы",
  },
  {
    name: "pavlodar_oblast",
    nameUpper: "Павлодарская область",
    nameUpperKz: "Павлодар облысы",
  },
  {
    name: "north_kazakhstan_oblast",
    nameUpper: "Северо-Казахстанская область",
    nameUpperKz: "Солтүстік Қазақстан облысы",
  },
  {
    name: "turkestan_oblast",
    nameUpper: "Туркестанская область",
    nameUpperKz: "Түркістан облысы",
  },
  {
    name: "ulytau_oblast",
    nameUpper: "Улытауская область",
    nameUpperKz: "Ұлытау облысы",
  },
];
export default MainPage;
