import { News } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";
import QrComponent from "@/components/QrComponent";

interface IProps {
  news?: News[];
  currNews?: number;
  handleClick?: any;
}

const NewsBlock: FC<IProps> = ({ news, currNews, handleClick }) => {
  const [prev, setPrev] = useState<News>();
  const [curr, setCurr] = useState<News>();
  useEffect(() => {
    if (news && currNews) {
      setCurr(news[currNews - 1]);
      if (currNews > 1) {
        setPrev(news[currNews - 2]);
      }
    }
  }, [news, currNews]);
  return (
    <div>
      <div className="w-[100%] flex gap-[20px]">
        <div
          onClick={() => handleClick(currNews ? currNews - 1 : 1)}
          className="w-[341px] h-[575px] px-[30px] pt-[50px] cursor-pointer pb-16 bg-white rounded-[40px] flex-col justify-start items-start gap-[30px] flex"
        >
          <div className="text-[#211F23] text-[30px] font-normal leading-[28%]">
            Предыдущая новость
          </div>
          <div className={"flex flex-col gap-[20px]"}>
            <img
              className="relative rounded-[40px] h-[287px] w-[280px]"
              src={prev?.img1}
            />
            <div className="text-indigo-800 text-2xl font-bold leading-normal">
              {prev ? (
                <div>
                  {prev?.text?.split(" ")[0] +
                    " " +
                    prev?.text?.split(" ")[1] +
                    " " +
                    prev?.text?.split(" ")[2] +
                    "..."}
                </div>
              ) : (
                <div>Больше нет новостей</div>
              )}
            </div>
            <div className="text-zinc-500 text-2xl font-medium leading-normal">
              {prev?.date}
            </div>
          </div>
        </div>

        <div className="w-[998px] flex flex-col bg-white rounded-[40px] p-[50px] gap-[30px]">
          <img
            className="w-[898px] h-[380px] rounded-[40px]"
            src={news && currNews ? news[currNews - 1].img1 : ""}
          />
          <div className="text-neutral-800 text-[18px] font-medium">
            {news && currNews && news[currNews - 1].text}
          </div>
        </div>
        <QrComponent/>

      </div>
    </div>
  );
};

export default NewsBlock;
