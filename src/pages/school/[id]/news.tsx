import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {getNewsThunk, getSchoolIdThunk, getSchoolPassportThunk, getSchoolThunk} from "@/store/thunks/school.thunk";
import NewsList from "@/components/lists/NewsList";
import NewsBlock from "@/components/blocks/NewsBlock";
const NewsPage = () => {
    const router = useRouter();
    const  id  =Number(router.query.id);
    const dispatch = useAppDispatch();
    const news = useTypedSelector((state) => state.schoolInfo.news);
    const [currNews,setCurrNews] = useState<number | null>();

    console.log(news)
    useEffect(() => {
        dispatch(getNewsThunk(id));
    }, [dispatch, id]);

    const handleBack = () => {
        if(currNews) setCurrNews(null);
        else
        router.push(`/school/${id}/main`);
    }

    const handleClick = (index: number) => {
        setCurrNews(index);
    }

    return (
        <MainLayout isMain={false} link={currNews ? "к списку новостей" : "на главную"} handleClick={handleBack}>
            {
                currNews ? (
                        <NewsBlock news={news} currNews={currNews} handleClick={handleClick}/>
                ) : (
                    <div>
                    <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                        Новости
                    </h1>
                <NewsList news={news} handleClick={handleClick}/>
                    </div>

    )
}

</MainLayout>
)
}

export default NewsPage;