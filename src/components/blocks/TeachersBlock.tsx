import { FC } from "react";
import { Teachers } from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Button from "@/components/ui/Button";
import QrComponent from "@/components/QrComponent";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Link from "next/link";

interface TeachersTableProps {
  teacher?: Teachers;
  t?: any;
}

const TeachersBlock: FC<TeachersTableProps> = ({ teacher }) => {
  const router = useRouter();
  const id = String(router.query.id);

  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  return (
    <div className={`w-full flex gap-[20px] max-sm:flex-col max-sm:h-[90vh] max-sm:gap-[10px] vr:flex-col `}>
      <div
        className={`w-[341px] h-[575px] flex flex-col items-center justify-between bg-white rounded-[40px] py-[30px]
        max-sm:w-full max-sm:h-auto max-sm:flex-row max-sm:p-[20px] max-sm:gap-[10px] vr:w-full vr:h-auto vr:flex-row vr:p-[20px]`}
      >
        <img
          src={teacher?.photo3x4 ? teacher?.photo3x4 : "/images/user.svg"}
          alt="teacher"
          className={`w-[280px] h-[280px] max-h-[280px] rounded-full max-sm:w-[140px] max-sm:h-[140px] max-sm:min-w-[140px] vr:w-[455px] vr:h-[460px]`}
        />
        <div className={`flex flex-col gap-[20px] text-left px-[30px] items-start max-sm:gap-[10px] max-sm:p-0 w-full `}>
          <div className={`text-neutral-800 text-2xl font-bold leading-[100%] max-sm:text-lg vr:text-[40px]`}>
            {teacher?.pedagog !== "Null" && teacher?.pedagog
              ? pedagog[teacher?.pedagog]
              : "Педагог"}
          </div>
          <p className="text-zinc-500 text-2xl leading-[143.3%] max-sm:text-[14px] vr:text-[30px]">
            {teacher?.subject !== "Null" && teacher?.subject
              ? teacher?.subject
              : "Учитель"}{" "}
          </p>
          <Link href={`/${id}/schedule/teacher/${teacher?.id}`} className={"w-full"}>
            <div className="text-indigo-800 text-2xl font-medium btn-gradient-1 justify-center items-center flex w-[100%] py-[18px]
            max-sm:py-[9px] max-sm:text-lg max-sm:px-[20px] max-sm:rounded-[10px] vr:text-[40px]">
              {t.teachers.schedule}
            </div>
          </Link>
        </div>
      </div>
      <div
        className={`p-[50px] flex flex-col gap-[50px] bg-white w-[998px] max-h-[910px] rounded-[40px] overflow-auto scrollbar-hide 
        max-sm:w-full max-sm:px-[20px] max-sm:py-[10px] max-sm:h-[100%] vr:w-full vr:px-[40px] vr:max-h-[1300px]`}
      >
        <div className={`flex flex-col gap-[20px] w-full`}>
          <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px] max-sm:text-2xl max-sm:leading-[30px]`}>
            {t.teachers.workExperience}
          </h1>
          {teacher?.job_history?.map((item, index) => (
            <div
              key={index}
              className={`py-[20px] px-[30px] w-[full] min-h-[80px]  flex flex-col bg-slate-50 text-start gap-[20px] rounded-[20px]
              max-sm:p-[20px] max-sm:gap-[10px]`}
            >
              <h1
                className={`text-pink-600 text-2xl font-bold leading-tight tracking-wider max-sm:text-lg`}
              >
                {item.start_date && item.start_date +
                  "-" +
                  (item.end_date ? item.end_date : t.teachers.today)}
              </h1>
              <p
                className={`text-neutral-800 text-lg font-medium leading-none max-sm:text-[14px]`}
              >
                {item.job_characteristic}
              </p>
            </div>
          ))}
        </div>
        <div className={`flex flex-col w-full gap-[20px]`}>
          <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px]`}>
            {t.teachers.speciality}
          </h1>
          {teacher?.speciality_history?.map((item, index) => (
            <div
              key={index}
              className={`py-[20px] px-[30px] w-[100%] min-h-[80px] flex flex-col bg-slate-50 items-start text-start gap-[20px] rounded-[20px]`}
            >
              <h1
                className={`text-pink-600 text-2xl font-bold leading-tight tracking-wider`}
              >
                {item.end_date ? item.end_date : item.mamandygy && t.teachers.today}
              </h1>
              <div
                className={`text-neutral-800 text-lg font-medium leading-none flex flex-col`}
              >
                <div>{item.end_date && t.teachers.yearOfGraduation + ": " + item.end_date}</div>
                <div>{item.speciality_university && t.teachers.educationalInstitution + ": " + item.speciality_university}</div>
                <div>{item.degree && t.teachers.level + ": " + educationLevels[item.degree ? item.degree : ""] }</div>
                <div>{item.mamandygy &&   t.teachers.profession +": " + item.mamandygy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <QrComponent/>
    </div>
  );
};


interface PedagogTypes {
  [key: string]: string;
}

const pedagog: PedagogTypes = {
  pedagog_sheber: "Педагог шебер",
  pedagog_zertteushy: "Педагог зерттеуші",
  pedagog_sarapshy: "Педагог сарапшы",
  pedagog_moderator: "Педагог модератор",
  pedagog_zhogary: "Жоғары санатты",
  pedagog_stazher: "Педагог стажер",
  pedagog1sanat: "1 санатты",
  pedagog2sanat: "2 санатты",
  pedagog_sanat_zhok: "Санаты жоқ",
  pedagog: "Педагог",
};

const educationLevels:PedagogTypes = {
  bakalavr: "Бакалавр",
  magistratura: "Магистратура",
  doktorantura: "Докторантура",
  srednee: "Среднее",
  viswee: "Высшее",
};


export default TeachersBlock;
