import { IKruzhok, News } from "@/types/assets.type";
import { FC } from "react";

interface IProps {
  item: News;
}

const NewsCard: FC<IProps> = ({ item }) => {
  return (
    <div className={"w-[1720px] min-h-[320px] bg-white flex rounded-[20px] cursor-pointer max-sm:w-full max-sm:flex-col"}>
      <div
        className={"rounded-tl-[20px] rounded-bl-[20px] w-[560px] max-sm:rounded-t-[20px] max-sm:rounded-l-none max-sm:h-[200px] max-sm:w-full"}
        style={{
          backgroundImage: `url(${item.img1})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className={
          "flex w-[1160px] flex-col gap-[20px] max-sm:gap-[10px] py-[20px] pl-[23px] px-[35px] max-sm:w-full max-sm:py-[15px] max-sm:px-[20px]"
        }
      >
        <div className={"text-[24px] font-bold text-[#524FA2] max-sm:text-lg"}>
          {item.text?.split(" ")[0] +
            " " +
            item.text?.split(" ")[1] +
            " " +
            item.text?.split(" ")[2] +
            "..."}
        </div>
        <div className={"text-2xl font-normal leading-[143.333%] max-sm:text-[14px]"}>
          {item.text}
        </div>
        <div className={"text-[20px] text-[#7B7984] max-sm:text-[14px]"}>{item.date}</div>
      </div>
    </div>
  );
};

export default NewsCard;
