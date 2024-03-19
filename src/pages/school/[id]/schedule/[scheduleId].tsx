import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {getClassThunk, getDopScheduleThunk, getScheduleThunk} from "@/store/thunks/school.thunk";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";


const SchedulePage = () => {
    const router = useRouter();
    const id=Number(router.query.id);
    const handleBack = () => {
            router.push(`/school/${id}/scheduleTabs`);
    }

    return (
        <MainLayout isMain={false} link={"к выбору класса"} handleClick={handleBack}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                {"Расписание уроков и дополнительных занятий"}
            </h1>
            <Schedule/>
        </MainLayout>
    );
}

export default SchedulePage;