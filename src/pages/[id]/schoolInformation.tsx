import { useRouter } from "next/router";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useRef, useState } from "react";
import {
  getSchoolPassportThunk,
} from "@/store/thunks/school.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Link from "next/link";
import { Oswald } from "next/font/google";
import Header from "@/components/Layout/Header";
import { SchoolPassport } from "@/types/assets.type";
import HeaderWBg from "@/components/Layout/HeaderWBg";
import QrComponent from "@/components/QrComponent";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

interface CountType {
  title?: string;
  count?: number;
}

interface TableType {
  title?: string;
  content?: string;
}

interface IType {
  id?: number;
  type?: string;
  link?: string;
}

const SchoolInformationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = String(router.query.id);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const school = useTypedSelector((state) => state.schoolInfo.schoolPassport);
  const [sch, setSch] = useState<SchoolPassport>();
  const [aboutCount, setAboutCount] = useState<CountType[]>([]);
  const [tableTeacher, setTableTeacher] = useState<TableType[]>([]);
  useEffect(() => {
    if (router.isReady && id) {
      dispatch(getSchoolPassportThunk(id));
    }
  }, [router.isReady, dispatch, id]);


  useEffect(() => {
    if (school) {
      setSch(school[0]);
      let arr: CountType[] = [];
      arr.push({
        title: t.school.totalNumberOfStudents,
        count: school[0]?.number_of_students,
      });
      arr.push({
        title: t.school.numberOfFamilies,
        count: school[0]?.amount_of_family,
      });
      arr.push({
        title: t.school.numberOfBoys,
        count: school[0]?.ul_sany,
      });
      arr.push({
        title: t.school.numberOfParents,
        count: school[0]?.amount_of_parents,
      });
      arr.push({
        title: t.school.numberOfGirls,
        count: school[0]?.kiz_sany,
      });
      setAboutCount(arr);
      let teacherArr: TableType[] = [];
      teacherArr.push({
        title: t.school.teacherMaster,
        content: String(school[0]?.pedagog_sheber || 0),
      });
      teacherArr.push({
        title: t.school.teacherResearcher,
        content: String(school[0]?.pedagog_zertteushy || 0),
      });
      teacherArr.push({
        title: t.school.teacherExpert,
        content: String(school[0]?.pedagog_sarapshy || 0),
      });
      teacherArr.push({
        title: t.school.teacherModerator,
        content: String(school[0]?.pedagog_moderator || 0),
      });
      teacherArr.push({
        title:  t.school.teacher,
        content: String(school[0]?.pedagog || 0),
      });
      teacherArr.push({
        title: t.school.teacherIntern,
        content: String(school[0]?.pedagog_stazher || 0),
      });
      teacherArr.push({
        title: t.school.highestCategory,
        content: String(school[0]?.pedagog_zhogary || 0),
      });
      teacherArr.push({
        title: t.school.categoryI,
        content: String(school[0]?.pedagog_1sanat || 0),
      });
      teacherArr.push({
        title: t.school.categoryII,
        content: String(school[0]?.pedagog_2sanat || 0),
      });
      setTableTeacher(teacherArr);
    }
  }, [sch, school,t]);
  const handleBack = () => {
    router.push(`/${id}/main`);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const [bgHeader, setBgHeader] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const currentScrollPosition = scrollRef.current.scrollTop;

        if (currentScrollPosition > 50) {
          setBgHeader(true);
        } else {
          setBgHeader(false);
        }
      }
    };

    const handleWindowScroll = (event: WheelEvent) => {
      if (scrollRef.current) {
        const currentScrollPosition = scrollRef.current.scrollTop;
        const scrollDelta = event.deltaY;
        scrollRef.current.scrollTop = currentScrollPosition + scrollDelta;
      }
    };

    // Отслеживание событий прокрутки
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Отслеживание событий колесика мыши
    window.addEventListener("wheel", handleWindowScroll, { passive: false });

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("wheel", handleWindowScroll);
    };
  }, []);


  const [sideBar, setSideBar] = useState<IType[]>();
  useEffect(() => {
     setSideBar( [{
           id: 1,
           type: t.school.administration,
           link: "administration",
         },

         {
           id: 2,
           type: t.school.contacts,
           link: "contacts",
         },
         {
           id: 3,
           type: t.school.photoGallery,
           link: "gallery",
         }])
  }, [t]);
  return (
    <div
      className={`w-[1920px] relative h-[1080px] bg-cover bg-no-repeat px-[100px] pt-[30px] ${oswald.variable} font-sans`}
      style={{ background: "url('/images/bg2.svg')" }}
      ref={bigRef}
    >
      {bgHeader ? (
        <HeaderWBg onClick={handleBack} isMain={false} toMain={"на главную"} page={`/${id}/schoolInformation`}/>
      ) : (
        <div className={"w-[1720px] absolute z-40"}>
          <Header onClick={handleBack} isMain={false} toMain={"на главную"} page={`/${id}/schoolInformation`}/>
        </div>
      )}
      <div
        className={"flex flex-col gap-[30px] absolute left-[100px] top-[110px]"}
      >
        <div
          className={
            "flex flex-col w-[341px] gap-[30px] bg-white text-2xl pb-[50px] rounded-[40px]"
          }
        >
          <img
            src="/images/defMap.png"
            alt=""
            className={"w-[341px] h-[365px] rounded-t-[40px]"}
          />
          <div className={"flex flex-col gap-[30px] px-[20px]"}>
            <div className={"text-[#211F23] font-bold text-left"}>
              {t.school.address}
            </div>
            <div className={"text-[#7B7984] font-medium text-left"}>
              {sch?.school_address}
            </div>
          </div>

        </div>
        <div className={"flex flex-col gap-[20px]"}>
          {sideBar?.map((item) => (
              <Link
                  href={`/${router.query.id}/${item.link}`}
                  key={item.id}
            >
              <div
                className={
                  "w-[341px] h-[64px] flex items-center justify-center text-center text-2xl font-bold leading-[20px] rounded-[20px] text-[#524FA2] border-2 border-[#5D49A0]"
                }
              >
                {item.type}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={
          "absolute w-[998px] h-[100%] top-0 left-[461px] overflow-auto scrollbar-hide pt-[110px] z-0"
        }
        ref={scrollRef}
      >
        <div
            className={
              "bg-white w-full  z-0 p-[50px] rounded-[40px] flex flex-col gap-[30px]"
            }
        >
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-[30px] font-bold "}>
              {sch?.school_name}
            </div>
            <img
                src={sch?.photo}
                alt=""
                className={"w-[898px] h-[427px] rounded-[40px]"}
            />
          </div>
          <div className={"flex flex-col gap-[30px] h-[158px] flex-wrap"}>
            {aboutCount?.map((item, index) => (
                <div key={index} className={"flex flex-col gap-[10px]"}>
                  <div className={"text-[18px] font-medium leading-[100%]"}>
                    {item.title}
                  </div>
                  <div
                      className={
                        "text-3xl font-bold leading-[100%] text-[#ED008C]"
                      }
                  >
                    {item.count ? item.count : "0"}
                  </div>
                </div>
            ))}
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              {t.school.generalInformation}
            </div>
            <div
                className={
                  "w-[900px] bg-[#F9F8FD] py-[22px] px-[27px] rounded-[20px]"
                }
            >
              <table className="w-full text-[20px] leading-[100%]">
                <tbody>
                <tr className="border-b border-b-black ">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.languageOfInstruction}
                  </td>
                  <td className="text-right text-[#211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.school_lang}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.status}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.status}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.capacity}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.vmestimost}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.actualNumberOfStudents}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_students}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              {t.school.distributionOfStudentsByClass}
            </div>
            <div
                className={
                  "w-[900px] bg-[#F9F8FD] py-[22px] px-[27px] rounded-[20px]"
                }
            >
              <table className="w-full text-[20px] leading-[100%]">
                <tbody>
                <tr className="border-b border-b-black ">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.preparatoryClass}
                  </td>
                  <td className="text-center text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.dayarlyk_class_number + " " + t.school.set}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.dayarlyk_student_number  + " " + t.school.students}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.classes1To4}
                  </td>
                  <td className="text-center text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_1_4_classes + " " + t.school.set}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_1_4_students  + " " + t.school.students}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.classes5To9}
                  </td>
                  <td className="text-center text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_5_9_classes + " " + t.school.set}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_5_9_students  + " " + t.school.students}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    {t.school.classes10To11}
                  </td>
                  <td className="text-center text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_10_11_classes + " " + t.school.set}
                  </td>
                  <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                    {sch?.number_of_10_11_students  + " " + t.school.students}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              {t.school.distributionOfTeachersByCategory}
            </div>
            <div
                className={
                  "w-[900px] bg-[#F9F8FD] py-[22px] px-[27px] rounded-[20px]"
                }
            >
              <table className="w-full text-[20px] leading-[100%]">
                <tbody>
                {
                  tableTeacher.map((item, index) => (
                      <tr key={index} className="border-b border-b-black">
                        <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                          {item.title}
                        </td>
                        <td className="text-right text-[211F23] font-bold pb-[14px] pt-[10px]">
                          {item.content + " " + t.school.specialist}
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
          <div className={"text-[18px] leading-[32px] text-[#211F23]"}>
            {sch?.school_history}
          </div>
        </div>
      </div>
      <div
          className="absolute right-[100px] top-[110px]">
        <QrComponent/>

      </div>
    </div>
  );
};



const sidebar: IType[] = [
  {
    id: 1,
    type: "Администрация",
    link: "administration",
  },

  {
    id: 2,
    type: "Контакты",
    link: "contacts",
  },

  {
    id: 3,
    type: "Фото-галерея",
    link: "gallery",
  },
];

export default SchoolInformationPage;
