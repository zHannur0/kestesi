import { IClass } from "@/types/assets.type";
import { FC } from "react";
import { useRouter } from "next/router";

interface IProps {
  classes: IClass[] | null;
  smena: number;
}

const ClassLetterTabs: FC<IProps> = ({ classes, smena }) => {
  const router = useRouter();
  const id = Number(router.query.id);

  const handleClick = (scheduleId: any) => {
    router.push(`/school/${id}/schedule/${scheduleId}`);
  };
  return (
    <div className={"flex flex-col gap-[30px]"}>
      <div className={"text-[30px] font-bold leading-[71%]"}>
        {smena === 1 && "Первая смена"}
        {smena === 2 && "Вторая смена"}
        {smena === 3 && "Третья смена"}
      </div>
      <div className={"flex gap-[20px]"}>
        {classes?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={
              "flex justify-center items-center w-[145px] h-[150px] rounded-[30px] border-[3px] border-[#524FA2] text-[72px] text-[#524FA2] font-bold leading-[80%]"
            }
          >
            {item.class_letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassLetterTabs;
