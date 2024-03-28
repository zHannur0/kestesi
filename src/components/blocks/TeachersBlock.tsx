import { FC } from "react";
import { Teachers } from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Button from "@/components/ui/Button";
import QrComponent from "@/components/QrComponent";

interface TeachersTableProps {
  teacher?: Teachers;
}

const TeachersBlock: FC<TeachersTableProps> = ({ teacher }) => {
  return (
    <div className={`w-full flex gap-[20px]`}>
      <div
        className={`w-[341px] h-[575px] flex flex-col items-center bg-white rounded-[40px] gap-[20px] pt-[30px]`}
      >
        <img
          src={teacher?.photo3x4}
          alt="teacher"
          className={`w-[280px] h-[280px] max-h-[280px] rounded-full`}
        />
        <div className={`flex flex-col gap-[20px] items-center text-center`}>
          <div className={`text-neutral-800 text-2xl font-bold leading-[100%]`}>
            {teacher?.pedagog !== "Null" && teacher?.pedagog
              ? pedagog[teacher?.pedagog]
              : "Педагог"}
          </div>
          <p className="text-zinc-500 text-2xl font-normal leading-[143.3%]">
            {teacher?.subject !== "Null" && teacher?.subject
              ? teacher?.subject
              : "Учитель"}{" "}
          </p>
        </div>
        <Button width={280} height={64}>
          <div className="text-indigo-800 text-2xl font-medium">Расписание</div>
        </Button>
      </div>
      <div
        className={`p-[50px] flex flex-col items-start gap-[50px] bg-white w-[998px] h-[910px] rounded-[40px] overflow-auto scrollbar-hide `}
      >
        <div className={`flex flex-col gap-[20px] w-full`}>
          <h1 className={`text-pink-600 text-3xl font-bold leading-[8.40px]`}>
            Опыт работы
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
                  (item.end_date ? item.end_date : "До настоящего времени")}
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
          <h1 className={`text-pink-600 text-3xl font-bold leading-[8.40px]`}>
            Специальность
          </h1>
          {teacher?.speciality_history?.map((item, index) => (
            <div
              key={index}
              className={`py-[20px] px-[30px] w-[840px] min-h-[80px] flex flex-col bg-slate-50 items-start text-start gap-[20px] rounded-[20px]`}
            >
              <h1
                className={`text-pink-600 text-2xl font-bold leading-tight tracking-wider`}
              >
                {item.end_date ? item.end_date : "До настоящего времени"}
              </h1>
              <div
                className={`text-neutral-800 text-lg font-medium leading-none flex flex-col`}
              >
                <div>{"Окончил в " + item.end_date + " году"}</div>
                <div>{"Университет = " + item.speciality_university}</div>
                <div>{"Уровень - " + item.degree}</div>
                <div>{"Профессия: " + item.mamandygy}</div>
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

export default TeachersBlock;
