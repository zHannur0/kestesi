import { allApi } from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {all} from "axios";
import {number} from "prop-types";

export const getSchoolThunk= createAsyncThunk(
    "getSchoolThunk",
    async()=> await allApi.getSchool(),
);

export const getSchoolIdThunk= createAsyncThunk(
    "getSchoolIdThunk",
    async(id?:number)=> await allApi.getSchoolId(id),
);

export const getSchoolPassportThunk= createAsyncThunk(
    "getSchoolPassportThunk",
    async(id?:number)=> await allApi.getSchoolPassport(id),
);

export const getNewsThunk= createAsyncThunk(
    "getNewsThunk",
    async(id?:number)=> await allApi.getNews(id),
);

export const getTeachersThunk= createAsyncThunk(
    "getTeachersThunk",
    async(id?:number)=> await allApi.getTeachers(id),
);

export const getTeacherThunk= createAsyncThunk(
    "getTeacherThunk",
    async(id?:number)=> await allApi.getTeacher(id),
);

export const getMapThunk= createAsyncThunk(
    "getMapThunk",
    async(id?:number)=> await allApi.getMap(id),
);

export const getClassroomsThunk= createAsyncThunk(
    "getClassroomsThunk",
    async(id?:number)=> await allApi.getClassrooms(id),
);

export const getClassroomThunk= createAsyncThunk(
    "getClassroomThunk",
    async(id?:number)=> await allApi.getClassroom(id),
);

export const getScheduleThunk= createAsyncThunk(
    "getScheduleThunk",
    async(id?:number)=> await allApi.getSchedule(id),
);

export const getDopScheduleThunk= createAsyncThunk(
    "getDopScheduleThunk",
    async(id?:number)=> await allApi.getDopSchedule(id),
);

export const getClassThunk= createAsyncThunk(
    "getClassThunk",
    async(id?:number)=> await allApi.getClass(id),
);

export const getClassIdThunk= createAsyncThunk(
    "getClassIdThunk",
    async(id?:number)=> await allApi.getClassId(id),
);


