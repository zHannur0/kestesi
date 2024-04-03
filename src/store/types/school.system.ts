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
  ISchoolOner, ISchoolPhotos,
  ISchoolSocialMedia,
  ISchoolSport,
  News,
  School,
  SchoolPassport,
  Teachers,
} from "@/types/assets.type";
import { KeyPairSyncResult } from "node:crypto";

export interface SchoolInfo {
  school?: School[];
  schoolId?: School;
  schoolPassport?: SchoolPassport[];
  news?: News[];
  teachers?: Teachers[];
  teacher?: Teachers;
  map?: IMap[];
  classrooms?: ClassRoom[];
  classroomId?: ClassRoom;
  osSchedule?: ISchedule[];
  dopSchedule?: IDopSchedule[];
  class: IClass[];
  classId: IClass;
  menus: IMenu[];
  menu: IMenu;
  sections: IKruzhok[];
  section: IKruzhok;
  sport?: ISchoolSport[];
  olimp?: ISchoolOlimp[];
  atest?: ISchoolAtest[];
  altyn?: ISchoolAltyn[];
  oner?: ISchoolOner[];
  director: ISchoolDirector[];
  administration: ISchoolAdmin[];
  socialMedia: ISchoolSocialMedia[];
  photos: ISchoolPhotos[];
  scheduleClass: ISchedule[];
  scheduleTeacher: ISchedule[];
  scheduleClassroom: ISchedule[];
  sectionId: IKruzhok;
}

export const initialStateSchoolInfo: SchoolInfo = {
  school: [],
  schoolId: {},
  schoolPassport: [],
  news: [],
  teacher: {},
  teachers: [],
  map: [],
  classroomId: {},
  classrooms: [],
  osSchedule: [],
  dopSchedule: [],
  class: [],
  classId: {},
  menus: [],
  menu: {},
  sections: [],
  section: {},
  sport: [],
  oner: [],
  olimp: [],
  atest: [],
  altyn: [],
  director: [],
  administration: [],
  socialMedia:[],
  photos:[],
  scheduleClass: [],
  scheduleClassroom: [],
  scheduleTeacher: [],
  sectionId: {}
};
