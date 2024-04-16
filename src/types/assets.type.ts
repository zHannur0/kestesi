export interface School {
  id?: number;
  school_kz_name?: string;
  school_ru_name?: string;
  school_eng_name?: string;
  url?: string;
  region?: string;
  logo?: string;
  timezone?: string;
  user?: number;
}

export interface SchoolPassport {
  id?: number;
  school_name?: string;
  school_address?: string;
  established?: number;
  amount_of_children?: number;
  ul_sany?: number;
  kiz_sany?: number;
  school_lang?: string;
  status?: string;
  vmestimost?: number;
  dayarlyk_class_number?: number;
  dayarlyk_student_number?: number;
  number_of_students?: number;
  number_of_classes?: number;
  number_of_1_4_students?: number;
  number_of_1_4_classes?: number;
  number_of_5_9_students?: number;
  number_of_5_9_classes?: number;
  number_of_10_11_students?: number;
  number_of_10_11_classes?: number;
  amount_of_family?: number;
  amount_of_parents?: number;
  all_pedagog_number?: number;
  pedagog_sheber?: number;
  pedagog_zertteushy?: number;
  pedagog_sarapshy?: number;
  pedagog_moderator?: number;
  pedagog?: number;
  pedagog_stazher?: number;
  pedagog_zhogary?: number;
  pedagog_1sanat?: number;
  pedagog_2sanat?: number;
  pedagog_sanat_zhok?: number;
  school_history?: string;
  school?: number;
  photo?: string;
}

export interface News {
  id?: number;
  date?: string;
  text?: string;
  type?: string;
  school?: number;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
  img6?: string;
  img7?: string;
  img8?: string;
  img9?: string;
  img10?: string;
}

export interface Teachers {
  id?: number;
  full_name?: string;
  photo3x4?: any;
  subject?: string;
  pedagog?: string;
  school?: number;
  job_history?: IJobHistory[];
  speciality_history?: ISpecialityHistory[];
}

interface IJobHistory {
  start_date?: number;
  end_date?: number;
  job_characteristic?: string;
}

interface ISpecialityHistory {
  end_date?: number;
  speciality_university?: string;
  degree?: string;
  mamandygy?: string;
}

export interface IMap {
  id?: number;
  map?: string;
  flat1?: string;
  flat2?: string;
  flat3?: string;
  flat4?: string;
  flat5?: string;
  school?: number;
}

export interface ClassRoom {
  id?: number;
  classroom_name?: string;
  classroom_number?: number;
  flat?: number;
  korpus?: number;
  school?: number;
}

export interface ISchedule {
  id?: number;
  week_day?: string;
  school?: number;
  teacher?: ITeacherSch;
  ring?: IRingSchedule;
  classl?: IClass;
  subject?: ISubjectSch;
  classroom?: IClassRoomSch;
  typez?: ITypezSch;
  subject2?: ISubjectSch;
  classroom2?: IClassRoomSch;
  teacher2?: ITeacherSch;
}

export interface IDopSchedule {
  id?: number;
  week_day?: string;
  school?: number;
  teacher?: ITeacherSch;
  ring?: IRingSchedule;
  classl?: IClass;
  subject?: ISubjectSch;
  classroom?: IClassRoomSch;
  typez?: ITypezSch;
  subject2?: ISubjectSch;
  classroom2?: IClassRoomSch;
  teacher2?: ITeacherSch;
}

interface ITypezSch {
  id?: number;
  type_full_name?: string;
  type_color?: string;
  school?: number;
}

interface ITeacherSch {
  id?: number;
  full_name?: string;
}

interface IRingSchedule {
  id?: number;
  start_time?: string;
  end_time?: string;
}

export interface IClass {
  id?: number;
  class_name?: string;
  class_number?: number;
  class_letter?: string;
  language?: string;
  classroom?: any;
  class_teacher?: any;
  osnova_plan?: any;
  osnova_smena?: any;
  dopurok_plan?: any;
  dopurok_smena?: any;
  school?: number;
}

interface ISubjectSch {
  id?: number;
  full_name?: string;
  type?: string;
}

interface IClassRoomSch {
  id?: number;
  classroom_name?: string;
  classroom_number?: number;
}

export interface IMenu {
  id?: number;
  food_name?: string;
  food_reti?: string;
  food_sostav?: string;
  vihod_1?: string;
  vihod_2?: string;
  vihod_3?: string;
  week_day?: string;
  school?: number;
}

export interface ISchoolDirector {
  id?: number;
  director_name?: string;
  director_photo?: string;
  phone_number?: string;
  email?: string;
  school?: number;
}

export interface ISchoolSocialMedia {
  id?: number;
  type?: string;
  account_name?: string;
  school?: number;
  qr_code?: string;
}

export interface ILessons {
  id?: number;
  full_name?: string;
  type?: string;
  school?: any;
}

export interface IExtraLessons {
  id?: number;
  type_full_name?: string;
  type_color?: string;
  school?: number;
}

export interface ICalls {
  id?: number;
  plan?: number;
  smena?: number;
  number?: number;
  start_time?: string;
  end_time?: string;
  school?: number;
}

export interface IKruzhok {
  id?: number;
  kruzhok_name?: string;
  school?: number;
  teacher?: any;
  photo?: string;
  purpose?: string;
  lessons?: ILesson[];
}

export interface ILesson {
  week_day?: number;
  start_end_time?: string;
}


export interface ISchoolSport {
  id?: number;
  fullname?: string;
  photo?: string;
  student_success?: string;
  classl?: any;
  school?: number;
  class_id?: string;
}

// School Oner

export interface ISchoolOner {
  id?: number;
  fullname?: string;
  photo?: string;
  student_success?: string;
  classl?: any;
  school?: number;
  class_id?: string;
}

// School Olimp

export interface ISchoolOlimp {
  id?: number;
  fullname?: string;
  photo?: string;
  student_success?: string;
  classl?: any;
  school?: number;
  class_id?: string;
}

// School Altyn

export interface ISchoolAltyn {
  id?: number;
  fullname?: string;
  photo?: string;
  student_success?: string;
  endyear?: string;
  school?: number;
  class_id?: string;
}

// School Atestat

export interface ISchoolAtest {
  id?: number;
  fullname?: string;
  photo?: string;
  student_success?: string;
  endyear?: string;
  school?: number;
  class_id?: string;
}

export interface ISchoolAdmin {
  id?: number;
  administrator_name?: string;
  phone_number?: string;
  administator_photo?: string;
  position?: string;
}

export interface ISchoolDirector {
  id?: number;
  director_name?: string;
  director_photo?: string;
  phone_number?: string;
  email?:string;
  school?: number;
}

export interface ISchoolSocialMedia {
  id?: number;
  type?: string;
  account_name?: string;
  school?: number;
  qr_code?:string;
}

export interface ISchoolPhotos {
  id?: number;
  slider_name?: string;
  slider_photo?: string;
  school?: number;
}

export interface ISlider {
  id?:number;
  school?:number;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  photo5?: string;
  photo6?: string;
  photo7?: string;
  photo8?: string;
  photo9?: string;
  photo10?: string;
}