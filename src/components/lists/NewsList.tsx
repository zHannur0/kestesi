import { News } from "@/types/assets.type";
import { FC } from "react";
import SectionCard from "@/components/cards/SectionCard";
import NewsCard from "@/components/cards/NewsCard";
import { handleAction } from "next/dist/server/app-render/action-handler";

interface IProps {
  news?: News[];
  handleClick?: any;
}

const NewsList: FC<IProps> = ({ news, handleClick }) => {
  return (
    <div>
      <div
        className={
          "flex flex-col gap-[20px] overflow-auto scrollbar-hide h-[910px] pb-[30px] max-sm:gap-[10px] vr:h-[85vh] vr:w-full"
        }
      >
        {news &&
          news.map((item, index) => (
            <div key={item.id} onClick={() => handleClick(index + 1)}>
              <NewsCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsList;
