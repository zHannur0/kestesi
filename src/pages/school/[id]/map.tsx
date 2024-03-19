import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {
    getClassroomsThunk,
    getMapThunk,
    getSchoolIdThunk,
    getSchoolPassportThunk,
    getSchoolThunk,
    getTeachersThunk,
    getTeacherThunk
} from "@/store/thunks/school.thunk";

const SchoolMapPage = () => {
    const router = useRouter();
    const  id  =Number(router.query.id);
    const dispatch = useAppDispatch();
    const map = useTypedSelector((state) => state.schoolInfo.map);
    const classrooms = useTypedSelector((state) => state.schoolInfo.classrooms);
    const classroom = useTypedSelector((state) => state.schoolInfo.classroomId);
    useEffect(() => {
        id && dispatch(getMapThunk(id));
        id && dispatch(getClassroomsThunk(id));
    }, [dispatch, id]);

    const handleBack = () => {
        router.push(`/school/${id}/main`);
    }

    return(
        <MainLayout handleClick={handleBack} isMain={false} link={"на главную"}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[50px]">
                Карта школы
            </h1>
            <div className={"flex gap-[20px] text-[24px] mb-[36px]"}>
                <div className={" text-[#7B7984]"}>
                    1 этаж
                </div>
                <div className={" text-[#ED008C] font-medium"}>
                    2 этаж
                </div>
                <div className={" text-[#7B7984]"}>
                    3 этаж
                </div>
            </div>
            <div className={"flex gap-[50px]"}>
                <div className={"w-[1070px] h-[750px]"}>
                    <img src="/images/map.svg" className={"w-full"} alt=""/>
                </div>
                <div className={"flex flex-col gap-[20px] h-[750px] overflow-auto  w-[600px] scrollbar-hide"}>
                    {classrooms && classrooms.slice().sort((a, b) => {
                        if (a.classroom_number && b.classroom_number) {
                            return a.classroom_number - b.classroom_number;
                        }
                        return 0;
                    }).map((item, index) => (
                        <div key={item.id} className={"min-h-[90px] pl-[26px] pr-[30px] flex gap-[33px] bg-white items-center rounded-xl"}>
                            <div className={"text-[#524FA2] text-[32px] font-semibold leading-[94%]"}>
                                {item.classroom_number}
                            </div>
                            <div className={"text-[28px] text-[#7B7984] leading-[90%]"}>
                                {item.classroom_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default SchoolMapPage;