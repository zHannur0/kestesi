import { instance } from "./axios.instance";
import {
    ClassRoom,
    IClass,
    IDopSchedule,
    IMap,
    ISchedule,
    News,
    School,
    SchoolPassport,
    Teachers
} from "@/types/assets.type";

export const allApi={
    async getSchool(): Promise<School[]> {
        return await instance.get("/admins/api/school/");
    }
,
    async getSchoolId(id?:number): Promise<School> {
        return await instance.get(`/admins/api/school/${id}/`);
    }
    ,

    async getSchoolPassport(id?:number): Promise<SchoolPassport[]> {
        return await instance.get(`/admins/api/schoolpasport/?school=${id}`);
    },

    async getNews(id?:number): Promise<News[]> {
        return await instance.get(`/admins/api/newsApi/?school=${id}`);
    },

    async getNewsId(id?: number): Promise<News> {
        return await instance.get(`https://bilimge.kz/admins/api/newsApi/${id}`);
    },

    async getTeachers(id?:number): Promise<Teachers[]> {
        return await instance.get(`/admins/api/teacher/?school=${id}`);
    },

    async getTeacher(id?: number): Promise<Teachers> {
        return await instance.get(`/admins/api/teacher/${id}`);
    },

    async getMap(id?: number): Promise<IMap[]> {
        return await instance.get(`/admins/api/schoolmap/?school=${id}`);
    },

    async getClassrooms(id?: number): Promise<ClassRoom[]> {
        return await instance.get(`/admins/api/classroom/?school=${id}`);
    },

    async getClassroom(id?: number): Promise<ClassRoom> {
        return await instance.get(`/admins/api/classroom/${id}`);
    },

    async getSchedule(id?: number): Promise<ISchedule[]> {
        return await instance.get(`/admins/api/schedule/?school=${id}`);
    },

    async getDopSchedule(id?: number): Promise<IDopSchedule[]> {
        return await instance.get(`/admins/api/DopUrokApi/?school=${id}`);
    },
    async getClass(id?: number): Promise<IClass[]> {
        return await instance.get(`/admins/api/class/?school=${id}`);
    },
    async getClassId(id?: number): Promise<IClass> {
        return await instance.get(`/admins/api/class/${id}`);
    },

}