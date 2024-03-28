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
}

const TeachersBlock: FC<TeachersTableProps> = ({ teacher }) => {
  const router = useRouter();
  const id = Number(router.query.id);

  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  return (
    <div className={`w-full flex gap-[20px]`}>
      <div
        className={`w-[341px] h-[575px] flex flex-col items-center justify-between bg-white rounded-[40px] py-[30px]`}
      >
        <img
          src={teacher?.photo3x4 ? teacher?.photo3x4 : "/images/user.svg"}
          alt="teacher"
          className={`w-[280px] h-[280px] max-h-[280px] rounded-full`}
        />
        <div className={`flex flex-col gap-[20px] text-left px-[30px]`}>
          <div className={`text-neutral-800 text-2xl font-bold leading-[100%]`}>
            {teacher?.pedagog !== "Null" && teacher?.pedagog
              ? pedagog[teacher?.pedagog]
              : "Педагог"}
          </div>
          <p className="text-zinc-500 text-2xl leading-[143.3%]">
            {teacher?.subject !== "Null" && teacher?.subject
              ? teacher?.subject
              : "Учитель"}{" "}
          </p>
        </div>
        <Link href={`/school/${id}/schedule/teacher/${teacher?.id}`}>
          <Button width={280} height={64}>
            <div className="text-indigo-800 text-2xl font-medium">{t.teachers.schedule}</div>
          </Button>
        </Link>

      </div>
      <div
        className={`p-[50px] flex flex-col items-start gap-[50px] bg-white w-[998px] max-h-[910px] rounded-[40px] overflow-auto scrollbar-hide `}
      >
        <div className={`flex flex-col gap-[20px] w-full`}>
          <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px]`}>
            {t.teachers.workExperience}
          </h1>
          {teacher?.job_history?.map((item, index) => (
            <div
              key={index}
              className={`py-[20px] px-[30px] w-[840px] min-h-[80px]  flex flex-col bg-slate-50 text-start gap-[20px] rounded-[20px]`}
            >
              <h1
                className={`text-pink-600 text-2xl font-bold leading-tight tracking-wider`}
              >
                {item.start_date +
                  "-" +
                  (item.end_date ? item.end_date : t.teachers.today)}
              </h1>
              <p
                className={`text-neutral-800 text-lg font-medium leading-none`}
              >
                {item.job_characteristic}
              </p>
            </div>
          ))}
        </div>
        <div className={`flex flex-col gap-[20px]`}>
          <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px]`}>
            {t.teachers.speciality}
          </h1>
          {teacher?.speciality_history?.map((item, index) => (
            <div
              key={index}
              className={`py-[20px] px-[30px] w-[840px] min-h-[80px] flex flex-col bg-slate-50 items-start text-start gap-[20px] rounded-[20px]`}
            >
              <h1
                className={`text-pink-600 text-2xl font-bold leading-tight tracking-wider`}
              >
                {item.end_date ? item.end_date : t.teachers.today}
              </h1>
              <div
                className={`text-neutral-800 text-lg font-medium leading-none flex flex-col`}
              >
                <div>{t.teachers.yearOfGraduation + ": " + item.end_date + " году"}</div>
                <div>{t.teachers.educationalInstitution + " - " + item.speciality_university}</div>
                <div>{t.teachers.level + " - " + educationLevels[item.degree ? item.degree : ""] }</div>
                <div>{t.teachers.profession +": " + item.mamandygy}</div>
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
