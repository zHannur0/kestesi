import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {
    getSchoolIdThunk,
    getSchoolPassportThunk,
    getSchoolThunk,
    getTeachersThunk,
    getTeacherThunk
} from "@/store/thunks/school.thunk";
import TeachersTable from "@/components/lists/TeachersTable";
import TeachersBlock from "@/components/blocks/TeachersBlock";
const TeachersPage = () => {
    const router = useRouter();
    const  id  =Number(router.query.id);
    const dispatch = useAppDispatch();
    const teachers = useTypedSelector((state) => state.schoolInfo.teachers);
    const teacher = useTypedSelector((state) => state.schoolInfo.teacher);

    const [teacherId, setTeacherId] = useState<number | null>();
    useEffect(() => {
        id && dispatch(getTeachersThunk(id));
    }, [dispatch, id]);

    const handleChooseTeacher = (id?:number) => {
        setTeacherId(id);
        dispatch(getTeacherThunk(id));
    }

    const handleBack = () => {
        if(teacherId) setTeacherId(null);
        else router.push(`/school/${id}/main`);
    }

    return(
        <MainLayout handleClick={handleBack} isMain={false} link={teacherId ? "к списку учителей" : "на главную"}>
            <div className={``}>
                <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                    {teacher? teacher.full_name : "Преподаватели"}
                </h1>
                {
                    !teacherId ? <TeachersTable teachers={teachers} handleChooseTeacher={handleChooseTeacher}/> :
                        <TeachersBlock teacher={teacher}/>
                }
            </div>
        </MainLayout>
    )
}

export default TeachersPage;