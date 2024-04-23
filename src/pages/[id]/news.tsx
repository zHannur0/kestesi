import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getNewsThunk,
  getSchoolIdThunk,
  getSchoolPassportThunk,
  getSchoolThunk,
} from "@/store/thunks/school.thunk";
import NewsList from "@/components/lists/NewsList";
import NewsBlock from "@/components/blocks/NewsBlock";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
const NewsPage = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const dispatch = useAppDispatch();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const news = useTypedSelector((state) => state.schoolInfo.news);
  const [currNews, setCurrNews] = useState<number | null>();
  useEffect(() => {
    if (router.isReady) {
      dispatch(getNewsThunk(id));
    }
  }, [router.isReady, dispatch, id]);


  const handleBack = () => {
    if (currNews) setCurrNews(null);
    else router.push(`/${id}`);
  };

  const handleClick = (index: number) => {
    if(index === 0) {
      setCurrNews(news?.length)
    }else
    setCurrNews(index);
  };



  return (
    <MainLayout
      isMain={false}
      link={currNews ? t.news.toTheNewsList : t.news.back}
      handleClick={handleBack}
      page={`/${id}/news`}
      bg={currNews ? "bg3" : "bg2"}
    >
      {currNews ? (
        <NewsBlock news={news} currNews={currNews} handleClick={handleClick} />
      ) : (
        <div>
          <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px] max-sm:text-2xl max-sm:mb-[20px]">
            {t.news.news}
          </h1>
          <NewsList news={news} handleClick={handleClick} />
        </div>
      )}
    </MainLayout>
  );
};

export default NewsPage;
