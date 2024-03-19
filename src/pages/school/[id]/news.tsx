import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {getNewsThunk, getSchoolIdThunk, getSchoolPassportThunk, getSchoolThunk} from "@/store/thunks/school.thunk";
const NewsPage = () => {
    const router = useRouter();
    const  id  =Number(router.query.id);
    const dispatch = useAppDispatch();
    const news = useTypedSelector((state) => state.schoolInfo.news);

    useEffect(() => {
        dispatch(getNewsThunk(id));
    }, [dispatch, id]);

    const handleBack = () => {

        router.push(`/school/${id}/main`);
    }

    return(
        <MainLayout isMain={false} link={"на главную"} handleClick={handleBack}>
            <div className="w-[100%] flex justify-between">
                <div
                    className="w-[341px] h-[575px] pl-[31px] pr-[30px] pt-[50px] pb-16 bg-white rounded-[40px] flex-col justify-start items-start gap-5 inline-flex">
                    <div
                        className="text-neutral-800 text-3xl font-normal leading-[28%]">Предыдущая
                        новость
                    </div>
                    <img className="relative rounded-[40px]"
                         src="https://via.placeholder.com/280x287"/>
                    <div className="text-indigo-800 text-2xl font-bold leading-normal">Здесь
                        зоголовок должен синий , предудующая новость
                    </div>
                    <div
                        className="text-zinc-500 text-2xl font-medium leading-normal">14.12.2024
                    </div>
                </div>
                <div className="w-[998px] h-[986px] relative bg-white rounded-[40px]">
                    <div
                        className="left-[50px] top-[50px] absolute text-neutral-800 text-3xl font-bold leading-[8.40px]">Здесь
                        зоголовок должен черненькими
                    </div>
                    <div
                        className="left-[50px] top-[548px] absolute text-neutral-800 text-lg font-medium leading-[18px]">Ранее
                        мы сообщали, что на дистанционное обучение в связи с морозами переходят учащиеся 0-11-х (12-х)
                        классов и студенты 1-2-го курса колледжей (на базе 9-го класса) в Астане. <br/><br/>Напомним, в
                        Астане произошло резкое похолодание. Если вчера температура воздуха днем поднялась до минус
                        одного градуса, то уже ночью столбики термометров опустились до минус 31 градуса. Ощущалось как
                        минус 37.<br/><br/> В городе объявлено штормовое предупреждение.Ранее мы сообщали, что на
                        дистанционное обучение в связи с морозами переходят учащиеся 0-11-х (12-х) классов и студенты
                        1-2-го курса колледжей (на базе 9-го класса) в Астане. <br/><br/>Напомним, в Астане произошло
                        резкое похолодание. Если вчера температура воздуха днем поднялась до минус одного градуса, то
                        уже ночью столбики термометров опустились до минус 31 градуса. <br/><br/>Ощущалось как минус 37.
                        В городе объявлено штормовое предупреждение.Ранее мы сообщали, что на дистанционное обучение в
                        связи с морозами переходят учащиеся 0-11-х (12-х) классов и студенты 1-2-го курса колледжей (на
                        базе 9-го класса) в Астане. Напомним, в Астане произошло резкое похолодание. <br/></div>
                    <div className="w-[898px] h-[380px] left-[50px] top-[118px] absolute bg-black rounded-[40px]">
                        <img className="left-[-1px] top-0 absolute"
                             src="https://via.placeholder.com/900x381"/>
                    </div>
                </div>
                <div
                    className="w-[340px] h-[448px] pl-5 pr-[9px] pt-[50px] pb-[78px] bg-white rounded-[40px] flex-col justify-start items-start gap-[30px] inline-flex">
                    <div
                        className="text-neutral-800 text-3xl font-normal leading-[8.40px]">Узнавайте
                        первым
                    </div>
                    <div className="w-[142.86px] h-[140px] relative">
                        <img src="/images/qr.svg"
                            className="w-[163.27px] h-40 absolute rounded-[20px]"/>
                    </div>
                    <div
                        className="text-zinc-500 text-2xl font-normal leading-[34.40px]">Сканируйте
                        QR-код и будьте в курсе самых свежих новостей и сплетен в школе и на райони
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}

export default NewsPage;