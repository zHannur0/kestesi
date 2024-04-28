import { News } from "@/types/assets.type";
import { FC, useEffect, useState } from "react";
import QrComponent from "@/components/QrComponent";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Slider from "@/components/Slider/Slider";
import {images} from "next/dist/build/webpack/config/blocks/images";

interface IProps {
  news?: News[];
  currNews?: number;
  handleClick?: any;
}

const NewsBlock: FC<IProps> = ({ news, currNews, handleClick }) => {
  const [prev, setPrev] = useState<News>();
  const [curr, setCurr] = useState<any>();
  const [slider, setSlider] = useState<any[]>();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  useEffect(() => {
    if (news && currNews) {
      setCurr(news[currNews - 1]);
      if (currNews > 1) {
        setPrev(news[currNews - 2]);
      }else {
        setPrev(news[news.length - 1]);
      }
    }
  }, [news, currNews]);

  useEffect(() => {
    const images: any[] = [];

    for (let i = 1; i <= 10; i++) {
      const imgKey:string = `img${i}`;
      if (curr?.[imgKey]) {
        images.push(curr?.[imgKey]);
      }
    }
    setSlider(images)
  }, [curr]);

  return (
    <div>
      <div className="w-[100%] flex gap-[20px] max-sm:flex-col">
        <div className={"flex gap-[20px] max-sm:flex-col-reverse"}>
          <div
              onClick={() => handleClick(currNews ? currNews - 1 : 1)}
              className="w-[341px] h-[575px] px-[30px] pt-[50px] cursor-pointer pb-16 bg-white rounded-[40px] flex-col justify-start items-start gap-[30px] flex
              max-sm:w-full max-sm:h-auto max-sm:p-[10px] max-sm:rounded-[20px]"
          >
            <div className="text-[#211F23] text-[30px] font-normal leading-[28%] max-sm:text-lg">
              {t.news.prev}
            </div>
            <div className={"flex flex-col gap-[20px] w-full"}>
              <img
                  className="relative rounded-[40px] h-[287px] w-full"
                  src={prev?.img1}
              />
              <div className="text-indigo-800 text-2xl font-bold leading-normal max-sm:text-lg">
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
              <div className="text-zinc-500 text-2xl font-medium leading-normal max-sm:text-[14px]">
                {prev?.date}
              </div>
            </div>
          </div>
          <div
              className="w-[998px] max-h-[940px] overflow-auto scrollbar-hide flex flex-col bg-white rounded-[40px] p-[50px] gap-[30px]
              max-sm:w-full max-sm:max-h-[757px] max-sm:p-[20px] max-sm:gap-[10px] max-sm:rounded-[20px]">
            <Slider slides={slider || []} time={3000}/>
            <div className="text-neutral-800 text-[18px] font-medium max-sm:text-[14px]">
              {news && currNews && news[currNews - 1].text}
            </div>
          </div>
        </div>
        <QrComponent/>
      </div>
    </div>
  );
};

export default NewsBlock;
