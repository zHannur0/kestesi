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

const SchoolInformationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = Number(router.query.id);
  const school = useTypedSelector((state) => state.schoolInfo.schoolPassport);
  const [sch, setSch] = useState<SchoolPassport>();
  const [aboutCount, setAboutCount] = useState<CountType[]>([]);
  const [tableTeacher, setTableTeacher] = useState<TableType[]>([]);
  useEffect(() => {
    id && dispatch(getSchoolPassportThunk(id));
    if (school) {
      setSch(school[0]);
      let arr: CountType[] = [];
      arr.push({
        title: "Общее количество учеников",
        count: school[0]?.number_of_students,
      });
      arr.push({
        title: "Количество семей",
        count: school[0]?.amount_of_family,
      });
      arr.push({
        title: "Количество мальчиков",
        count: school[0]?.ul_sany,
      });
      arr.push({
        title: "Количество родителей",
        count: school[0]?.amount_of_parents,
      });
      arr.push({
        title: "Количество девочек",
        count: school[0]?.kiz_sany,
      });
      setAboutCount(arr);
      let teacherArr: TableType[] = [];
      teacherArr.push({
        title: "Педагог-мастер",
        content: String(school[0]?.pedagog_sheber || 0),
      });
      teacherArr.push({
        title: "Педагог-исследователь",
        content: String(school[0]?.pedagog_zertteushy || 0),
      });
      teacherArr.push({
        title: "Педагог-эксперт",
        content: String(school[0]?.pedagog_sarapshy || 0),
      });
      teacherArr.push({
        title: "Педагог-модератор",
        content: String(school[0]?.pedagog_moderator || 0),
      });
      teacherArr.push({
        title: "Педагог",
        content: String(school[0]?.pedagog || 0),
      });
      teacherArr.push({
        title: "Педагог-стажер",
        content: String(school[0]?.pedagog_stazher || 0),
      });
      teacherArr.push({
        title: "Высшая категория",
        content: String(school[0]?.pedagog_zhogary || 0),
      });
      teacherArr.push({
        title: "I категория",
        content: String(school[0]?.pedagog_1sanat || 0),
      });
      teacherArr.push({
        title: "II категория ",
        content: String(school[0]?.pedagog_2sanat || 0),
      });
      setTableTeacher(teacherArr);
    }
  }, [dispatch, id, sch, school]);
  const handleBack = () => {
    router.push(`/school/${id}/main`);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const [bgHeader, setBgHeader] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowScroll = (event: WheelEvent) => {
      if (scrollRef.current) {
        const currentScrollPosition = scrollRef.current.scrollTop;
        const scrollDelta = event.deltaY;
        scrollRef.current.scrollTop = currentScrollPosition + scrollDelta;

        if (scrollRef.current.scrollTop > 50) {
          setBgHeader(true);
        } else {
          setBgHeader(false);
        }
      }
    };

    window.addEventListener("wheel", handleWindowScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowScroll);
    };
  }, []);
  return (
    <div
      className={`w-[1920px] relative h-[1080px] bg-cover bg-no-repeat px-[100px] pt-[30px] ${oswald.variable} font-sans`}
      style={{ background: "url('/images/bg.svg')" }}
      ref={bigRef}
    >
      {bgHeader ? (
        <HeaderWBg onClick={handleBack} isMain={false} toMain={"на главную"} />
      ) : (
        <div className={"w-[1720px] absolute z-40"}>
          <Header onClick={handleBack} isMain={false} toMain={"на главную"} />
        </div>
      )}
      <div
        className={"flex flex-col gap-[30px] absolute left-[100px] top-[110px]"}
      >
        <div
          className={
            "flex flex-col w-[341px] h-[497px] gap-[30px] items-center bg-white text-2xl text-center pb-[50px] rounded-[40px]"
          }
        >
          <img
            src=""
            alt=""
            className={"w-[341px] h-[365px] rounded-t-[40px]"}
          />
          <div className={"text-[#211F23] font-bold"}>
            Адрес
          </div>
          <div className={"text-[#7B7984] font-medium"}>
            {sch?.school_address}
          </div>
        </div>
        <div className={"flex flex-col gap-[20px]"}>
          {sidebar.map((item) => (
            <Link
              href={`/school/${router.query.id}/${item.link}`}
              key={item.id}
            >
              <div
                className={
                  "w-[341px] h-[64px] flex items-center justify-center text-center text-2xl font-medium leading-[20px] rounded-[20px] text-[#524FA2] border-2 border-[#5D49A0]"
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
            <div className={"text-[30px] font-bold leading-[28%]"}>
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
                        "text-3xl font-semibold leading-[100%] text-[#ED008C]"
                      }
                  >
                    {item.count ? item.count : "0"}
                  </div>
                </div>
            ))}
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              Общая информация
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
                    Язык обучения
                  </td>
                  <td className="text-right text-[#211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.school_lang}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    Статус
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.status}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    Вместимость
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.vmestimost}
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    Фактическое количество обучающихся
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_students}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              Распределение учеников по классам
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
                    Подготовительный класс
                  </td>
                  <td className="text-center text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.dayarlyk_class_number} класс-комплект
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.dayarlyk_student_number} учеников
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    1-4 классы
                  </td>
                  <td className="text-center text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_1_4_classes} класс-комплект
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_1_4_students} учеников
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    5-9 классы
                  </td>
                  <td className="text-center text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_5_9_classes} класс-комплект
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_5_9_students} учеников
                  </td>
                </tr>
                <tr className="border-b border-b-black">
                  <td className="text-[#211F23] text-left pb-[14px] pt-[10px]">
                    10-11 классы
                  </td>
                  <td className="text-center text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_10_11_classes} класс-комплект
                  </td>
                  <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                    {sch?.number_of_10_11_students} учеников
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <div className={"text-2xl font-bold leading-[100%]"}>
              Распределение преподавателей по категориям
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
                        <td className="text-right text-[211F23] font-medium pb-[14px] pt-[10px]">
                          {item.content} специалист
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
          className="w-[340px] h-[448px] pl-5 pr-[9px] pt-[50px] pb-[78px] bg-white rounded-[40px] flex-col justify-start items-start gap-[30px] inline-flex absolute right-[100px] top-[110px]">
        <div className="text-neutral-800 text-3xl font-normal leading-[8.40px]">
          Узнавайте первым
        </div>
        <div className="w-[142.86px] h-[140px] relative">
          <img
              src="/images/qr.svg"
              className="w-[163.27px] h-40 absolute rounded-[20px]"
          />
        </div>
        <div className="text-zinc-500 text-2xl font-normal leading-[34.40px]">
          Сканируйте QR-код и будьте в курсе самых свежих новостей и сплетен в
          школе и на райони
        </div>
      </div>
    </div>
  );
};

interface IType {
  id?: number;
  type?: string;
  link?: string;
}

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
