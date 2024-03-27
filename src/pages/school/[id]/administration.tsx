import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {getAdministrationThunk, getDirectorThunk, getNewsThunk} from "@/store/thunks/school.thunk";

const Administration = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const dispatch = useAppDispatch();
    const director = useTypedSelector((state) => state.schoolInfo.director);
    const administration = useTypedSelector((state) => state.schoolInfo.administration);
    useEffect(() => {
        id && dispatch(getDirectorThunk(id));
        id && dispatch(getAdministrationThunk(id));
    }, [dispatch, id]);
    const handleBack = () => {
        router.push(`/school/${id}/main`);
    };
    return (
        <MainLayout isMain={false} link={"на главную"} handleClick={handleBack}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                Администрация
            </h1>
            <div className={"flex flex-col bg-white rounded-[40px] w-[100%] max-h-[933px]"}>
                <div className={"flex gap-[50px] py-[46px] px-[50px] bg-[#F8F8FB] rounded-tl-[40px] rounded-tr-[40px] w-[100%] h-[362px] items-center"}>
                    <img src={director ? director?.[0].director_photo : "/images/user.svg"} alt="" className={"w-[270px] h-[270px] rounded-full"}/>
                    <div className={"flex flex-col gap-[20px]"}>
                        <div className={"flex flex-col"}>
                            <div className={"text-[30px] leading-[50px] font-bold text-[#524FA2]"}>
                                {director?.[0].director_name}
                            </div>
                            <div className={"text-[24px] leading-[20px] text-[#211F23]"}>
                                Мектеп директоры
                            </div>
                        </div>
                        <div className={"flex h-[60px] rounded-[20px] bg-white"}>
                            <img src="/images/phone.svg" alt="" className={"w-[60px] h-[60px] rounded-l-[20px]"}/>
                            <div className={"flex flex-col pl-[10px] py-[10px] pr-[20px]"}>
                                <div className={"text-[14px] text-[#202020]"}>
                                    Приемная
                                </div>
                                <div className={"text-[18px] font-bold"}>
                                    {director?.[0].phone_number}
                                </div>
                            </div>
                        </div>
                        <div className={"flex h-[60px] rounded-[20px] bg-white"}>
                            <img src="/images/email.svg" alt="" className={"w-[60px] h-[60px] rounded-l-[20px]"}/>
                            <div className={"flex flex-col pl-[10px] py-[10px] pr-[20px]"}>
                                <div className={"text-[14px] text-[#202020]"}>
                                    Электронная почта
                                </div>
                                <div className={"text-[18px] font-bold"}>
                                    {director?.[0].email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col px-[35px] py-[50px] w-full gap-[30px]"}>
                    <div className={"text-[#211F23] font-bold leading-[80%] text-[30px]"}>
                        Администрация школы
                    </div>
                    <div className={"flex flex-wrap gap-[50px]"}>
                        {
                            administration.map((item) => (
                                <div key={item.id} className={"flex flex-col gap-[20px] py-[15px] px-[20px] items-start rounded-[30px] w-[290px] min-h-[370px] bg-[#F9F8FD]"}>
                                    <img src={item.administator_photo ? item.administator_photo : "/images/user.svg"} alt="" className={"w-[170px] h-[170px] rounded-full"}/>
                                    <div className={"flex flex-col gap-[10px]"}>
                                        <div className={"text-[24px] leading-[24px] font-bold text-[#524FA2]"}>
                                            {item.administrator_name}
                                        </div>
                                        <div className={"text-[18px] text-[#211F23]"}>
                                            {item.position}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Administration;