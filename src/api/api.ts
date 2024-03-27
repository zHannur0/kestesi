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
  async getSchoolId(id?: number): Promise<School> {
    return await instance.get(`/admins/api/school/${id}/`);
  },
  async getSchoolPassport(id?: number): Promise<SchoolPassport[]> {
    return await instance.get(`/admins/api/schoolpasport/?school=${id}`);
  },

  async getNews(id?: number): Promise<News[]> {
    return await instance.get(`/admins/api/newsApi/?school=${id}`);
  },

  async getNewsId(id?: number): Promise<News> {
    return await instance.get(`https://bilimge.kz/admins/api/newsApi/${id}`);
  },

  async getTeachers(id?: number): Promise<Teachers[]> {
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
  async getMenu(id?: number): Promise<IMenu[]> {
    return await instance.get(`/admins/api/menu/?school=${id}`);
  },
  async getSections(id?: number): Promise<IKruzhok[]> {
    return await instance.get(`/admins/api/kruzhok/?school=${id}`);
  },
  async getSport(id?: number): Promise<ISchoolSport[]> {
    return await instance.get(`/admins/api/Sport_SuccessApi/?school=${id}`);
  },
  async getArt(id?: number): Promise<ISchoolOner[]> {
    return await instance.get(`/admins/api/Oner_SuccessApi/?school=${id}`);
  },
  async getOlympiad(id?: number): Promise<ISchoolOlimp[]> {
    return await instance.get(`/admins/api/PandikOlimpiadaApi/?school=${id}`);
  },
  async getRed(id?: number): Promise<ISchoolAtest[]> {
    return await instance.get(`/admins/api/School_RedCertificateApi/?school=${id}`);
  },
  async getGoldMedal(id?: number): Promise<ISchoolAltyn[]> {
    return await instance.get(`/admins/api/School_AltynBelgiApi/?school=${id}`);
  },
  async getDirector(id?: number): Promise<ISchoolDirector[]> {
    return await instance.get(`/admins/api/school_director/?school=${id}`);
  },
  async getAdministration(id?: number): Promise<ISchoolAdmin[]> {
    return await instance.get(`/admins/api/school_administration/?school=${id}`);
  },
  async getSocialMedia(id?: number): Promise<ISchoolSocialMedia[]> {
    return await instance.get(`/admins/api/School_SocialMediaApi/?school=${id}`);
  },
};
