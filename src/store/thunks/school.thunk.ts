import { allApi } from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { all } from "axios";
import { number } from "prop-types";

export const getSchoolThunk = createAsyncThunk(
  "getSchoolThunk",
  async () => await allApi.getSchool(),
);

export const getSchoolIdThunk = createAsyncThunk(
  "getSchoolIdThunk",
  async (id?: string) => await allApi.getSchoolId(id),
);

export const getSchoolPassportThunk = createAsyncThunk(
  "getSchoolPassportThunk",
  async (id?: string) => await allApi.getSchoolPassport(id),
);

export const getNewsThunk = createAsyncThunk(
  "getNewsThunk",
  async (id?: string) => await allApi.getNews(id),
);

export const getTeachersThunk = createAsyncThunk(
  "getTeachersThunk",
  async (id?: string) => await allApi.getTeachers(id),
);

export const getTeacherThunk = createAsyncThunk(
  "getTeacherThunk",
  async (id?: number) => await allApi.getTeacher(id),
);

export const getMapThunk = createAsyncThunk(
  "getMapThunk",
  async (id?: string) => await allApi.getMap(id),
);

export const getClassroomsThunk = createAsyncThunk(
  "getClassroomsThunk",
  async (id?: string) => await allApi.getClassrooms(id),
);

export const getClassroomThunk = createAsyncThunk(
  "getClassroomThunk",
  async (id?: number) => await allApi.getClassroom(id),
);

export const getScheduleThunk = createAsyncThunk(
  "getScheduleThunk",
  async (id?: string) => await allApi.getSchedule(id),
);

export const getDopScheduleThunk = createAsyncThunk(
  "getDopScheduleThunk",
  async (id?: string) => await allApi.getDopSchedule(id),
);

export const getClassThunk = createAsyncThunk(
  "getClassThunk",
  async (id?: string) => await allApi.getClass(id),
);

export const getClassIdThunk = createAsyncThunk(
  "getClassIdThunk",
  async (id?: number) => await allApi.getClassId(id),
);

export const getMenuThunk = createAsyncThunk(
  "getMenuThunk",
  async (id?: string) => await allApi.getMenu(id),
);

export const getSectionsThunk = createAsyncThunk(
  "getSectionsThunk",
  async (id?: string) => await allApi.getSections(id),
);

export const getSectionThunk = createAsyncThunk(
    "getSectionThunk",
    async (id?: number) => await allApi.getSection(id),
);

export const getSportThunk = createAsyncThunk(
    "getSportThunk",
    async (id?: string) => await allApi.getSport(id),
);

export const getGoldThunk = createAsyncThunk(
    "getGoldThunk",
    async (id?: string) => await allApi.getGoldMedal(id),
);

export const getRedThunk = createAsyncThunk(
    "getRedThunk",
    async (id?: string) => await allApi.getRed(id),
);

export const getArtThunk = createAsyncThunk(
    "getArtThunk",
    async (id?: string) => await allApi.getArt(id),
);

export const getOlympiadThunk = createAsyncThunk(
    "getOlympiadThunk",
    async (id?: string) => await allApi.getOlympiad(id),
);

export const getDirectorThunk = createAsyncThunk(
    "getDirectorThunk",
    async (id?: string) => await allApi.getDirector(id),
);

export const getAdministrationThunk = createAsyncThunk(
    "getAdministrationThunk",
    async (id?: string) => await allApi.getAdministration(id),
);

export const getSocialMediaThunk = createAsyncThunk(
    "getSocialMediaThunk",
    async (id?: string) => await allApi.getSocialMedia(id),
);
export const getPhotosThunk = createAsyncThunk(
    "getPhotosThunk",
    async (id?: string) => await allApi.getPhotos(id),
);

export const getClassScheduleThunk = createAsyncThunk(
    "getClassScheduleThunk",
    async ({id, classId} : { id?: string, classId?: number }) => await allApi.getClassSchedule(id, classId),
);

export const getTeacherScheduleThunk = createAsyncThunk(
    "getTeacherScheduleThunk",
    async ({id, teacherId} : { id?: string, teacherId?: number }) => await allApi.getTeacherSchedule(id, teacherId),
);

export const getClassroomScheduleThunk = createAsyncThunk(
    "getClassroomScheduleThunk",
    async ({id, classroomId} : { id?: string, classroomId?: number }) => await allApi.getClassroomSchedule(id, classroomId),
);