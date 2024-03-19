import {
    ClassRoom,
    IClass,
    IDopSchedule, IKruzhok,
    IMap, IMenu,
    ISchedule,
    News,
    School,
    SchoolPassport,
    Teachers
} from "@/types/assets.type";
import {KeyPairSyncResult} from "node:crypto";

export interface SchoolInfo {
    school?: School[];
    schoolId?: School;
    schoolPassport?: SchoolPassport[];
    news?:News[],
    teachers?: Teachers[],
    teacher?: Teachers,
    map?: IMap[],
    classrooms?: ClassRoom[],
    classroomId?: ClassRoom,
    osSchedule?: ISchedule[],
    dopSchedule?: IDopSchedule[],
    class: IClass[],
    classId: IClass,
    menus: IMenu[],
    menu: IMenu,
    sections: IKruzhok[],
    section: IKruzhok,

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
    classrooms:[],
    osSchedule: [],
    dopSchedule: [],
    class: [],
    classId: {},
    menus:[],
    menu:{},
    sections: [],
    section: {}
}

