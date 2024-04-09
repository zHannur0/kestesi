import { instance } from "./axios.instance";
import {
  ClassRoom,
  IClass,
  IDopSchedule,
  IKruzhok,
  IMap,
  IMenu,
  ISchedule,
  ISchoolAdmin,
  ISchoolAltyn,
  ISchoolAtest,
  ISchoolDirector,
  ISchoolOlimp,
  ISchoolOner,
  ISchoolSocialMedia,
  ISchoolSport,
  News,
  School,
  SchoolPassport,
  Teachers,
} from "@/types/assets.type";

export const allApi = {
  async getSchool(): Promise<School[]> {
    return await instance.get("/admins/api/school/");
  },
  async getSchoolId(id?: string): Promise<School> {
    return await instance.get(`/admins/api/school/${id}/`);
  },
  async getSchoolPassport(id?: string): Promise<SchoolPassport[]> {
    return await instance.get(`/admins/api/schoolpasport/?school=${id}`);
  },

  async getNews(id?: string): Promise<News[]> {
    return await instance.get(`/admins/api/newsApi/?school=${id}`);
  },

  async getNewsId(id?: string): Promise<News> {
    return await instance.get(`https://bilimge.kz/admins/api/newsApi/${id}`);
  },

  async getTeachers(id?: string): Promise<Teachers[]> {
    return await instance.get(`/admins/api/teacher/?school=${id}`);
  },

  async getTeacher(id?: number): Promise<Teachers> {
    return await instance.get(`/admins/api/teacher/${id}`);
  },

  async getMap(id?: string): Promise<IMap[]> {
    return await instance.get(`/admins/api/schoolmap/?school=${id}`);
  },

  async getClassrooms(id?: string): Promise<ClassRoom[]> {
    return await instance.get(`/admins/api/classroom/?school=${id}`);
  },

  async getClassroom(id?: number): Promise<ClassRoom> {
    return await instance.get(`/admins/api/classroom/${id}`);
  },

  async getSchedule(id?: string): Promise<ISchedule[]> {
    return await instance.get(`/admins/api/schedule/?school=${id}`);
  },

  async getDopSchedule(id?: string): Promise<IDopSchedule[]> {
    return await instance.get(`/admins/api/DopUrokApi/?school=${id}`);
  },
  async getClass(id?: string): Promise<IClass[]> {
    return await instance.get(`/admins/api/class/?school=${id}`);
  },
  async getClassId(id?: number): Promise<IClass> {
    return await instance.get(`/admins/api/class/${id}`);
  },
  async getMenu(id?: string): Promise<IMenu[]> {
    return await instance.get(`/admins/api/menu/?school=${id}`);
  },
  async getSections(id?: string): Promise<IKruzhok[]> {
    return await instance.get(`/admins/api/kruzhok/?school=${id}`);
  },
  async getSection(id?: number): Promise<IKruzhok> {
    return await instance.get(`/admins/api/kruzhok/${id}`);
  },
  async getSport(id?: string): Promise<ISchoolSport[]> {
    return await instance.get(`/admins/api/Sport_SuccessApi/?school=${id}`);
  },
  async getArt(id?: string): Promise<ISchoolOner[]> {
    return await instance.get(`/admins/api/Oner_SuccessApi/?school=${id}`);
  },
  async getOlympiad(id?: string): Promise<ISchoolOlimp[]> {
    return await instance.get(`/admins/api/PandikOlimpiadaApi/?school=${id}`);
  },
  async getRed(id?: string): Promise<ISchoolAtest[]> {
    return await instance.get(`/admins/api/School_RedCertificateApi/?school=${id}`);
  },
  async getGoldMedal(id?: string): Promise<ISchoolAltyn[]> {
    return await instance.get(`/admins/api/School_AltynBelgiApi/?school=${id}`);
  },
  async getDirector(id?: string): Promise<ISchoolDirector[]> {
    return await instance.get(`/admins/api/school_director/?school=${id}`);
  },
  async getAdministration(id?: string): Promise<ISchoolAdmin[]> {
    return await instance.get(`/admins/api/school_administration/?school=${id}`);
  },
  async getSocialMedia(id?: string): Promise<ISchoolSocialMedia[]> {
    return await instance.get(`/admins/api/School_SocialMediaApi/?school=${id}`);
  },
  async getPhotos(id?: string): Promise<ISchoolSocialMedia[]> {
    return await instance.get(`/admins/api/slider/?school=${id}`);
  },
  async getClassSchedule(id?: string, classId?:number): Promise<ISchedule[]> {
    return await instance.get(`/admins/api/schedule/?school=${id}&classl=${classId}`);
  },
  async getClassroomSchedule(id?: string, classroomId?:number): Promise<ISchedule[]> {
    return await instance.get(`/admins/api/schedule/?school=${id}&classroom=${classroomId}`);
  },
  async getTeacherSchedule(id?: string, teacherId?:number): Promise<ISchedule[]> {
    return await instance.get(`/admins/api/schedule/?school=${id}&teacher=${teacherId}`);
  },
};
