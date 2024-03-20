import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {initialStateSchoolInfo} from "@/store/types/school.system";
import {
    getClassIdThunk,
    getClassroomsThunk, getClassroomThunk, getClassThunk, getDopScheduleThunk,
    getMapThunk, getMenuThunk,
    getNewsThunk, getScheduleThunk,
    getSchoolIdThunk,
    getSchoolPassportThunk,
    getSchoolThunk, getSectionsThunk,
    getTeachersThunk, getTeacherThunk
} from "@/store/thunks/school.thunk";
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

export const schoolSlice=createSlice(
    {
        name: "schoolInfo",
        initialState: initialStateSchoolInfo,
        reducers: {},
            extraReducers: function (builder){
                builder.addCase(
                    getSchoolThunk.fulfilled,
                    (state, action: PayloadAction<School[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                school: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getSchoolIdThunk.fulfilled,
                    (state, action: PayloadAction<School>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                schoolId: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getSchoolPassportThunk.fulfilled,
                    (state, action: PayloadAction<SchoolPassport[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                schoolPassport: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getNewsThunk.fulfilled,
                    (state, action: PayloadAction<News[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                news: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getTeachersThunk.fulfilled,
                    (state, action: PayloadAction<Teachers[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                teachers: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getTeacherThunk.fulfilled,
                    (state, action: PayloadAction<Teachers>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                teacher: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getMapThunk.fulfilled,
                    (state, action: PayloadAction<IMap[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                map: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getClassroomsThunk.fulfilled,
                    (state, action: PayloadAction<ClassRoom[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                classrooms: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getClassroomThunk.fulfilled,
                    (state, action: PayloadAction<ClassRoom>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                classroomId: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getScheduleThunk.fulfilled,
                    (state, action: PayloadAction<ISchedule[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                osSchedule: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getDopScheduleThunk.fulfilled,
                    (state, action: PayloadAction<IDopSchedule[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                dopSchedule: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getClassThunk.fulfilled,
                    (state, action: PayloadAction<IClass[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                class: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getClassIdThunk.fulfilled,
                    (state, action: PayloadAction<IClass>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                classId: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getMenuThunk.fulfilled,
                    (state, action: PayloadAction<IMenu[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                menus: action.payload,
                            };
                        }
                        return state;
                    },
                ).addCase(
                    getSectionsThunk.fulfilled,
                    (state, action: PayloadAction<IKruzhok[]>) => {
                        if (action.payload) {
                            return {
                                ...state,
                                sections: action.payload,
                            };
                        }
                        return state;
                    },
                )
            }
    }
);

export const { actions } = schoolSlice;

export default schoolSlice.reducer;