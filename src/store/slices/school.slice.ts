import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateSchoolInfo } from "@/store/types/school.system";
import {
    getAdministrationThunk,
    getArtThunk,
    getClassIdThunk, getClassroomScheduleThunk,
    getClassroomsThunk,
    getClassroomThunk, getClassScheduleThunk,
    getClassThunk, getDirectorThunk,
    getDopScheduleThunk, getGoldThunk,
    getMapThunk,
    getMenuThunk,
    getNewsThunk, getOlympiadThunk, getPhotosThunk, getPrideThunk, getRedThunk,
    getScheduleThunk,
    getSchoolIdThunk,
    getSchoolPassportThunk,
    getSchoolThunk,
    getSectionsThunk, getSectionThunk, getSliderThunk, getSocialMediaThunk, getSportThunk, getTeacherScheduleThunk,
    getTeachersThunk,
    getTeacherThunk,
} from "@/store/thunks/school.thunk";
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
    ISchoolOner, ISchoolPhotos, ISchoolPride,
    ISchoolSocialMedia,
    ISchoolSport, ISlider,
    News,
    School,
    SchoolPassport,
    Teachers,
} from "@/types/assets.type";

export const schoolSlice = createSlice({
  name: "schoolInfo",
  initialState: initialStateSchoolInfo,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      )
      .addCase(
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
      ).addCase(
        getSportThunk.fulfilled,
        (state, action: PayloadAction<ISchoolSport[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    sport: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getGoldThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAltyn[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    altyn: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getRedThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAtest[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    atest: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getArtThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOner[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    oner: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getOlympiadThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOlimp[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    olimp: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getDirectorThunk.fulfilled,
        (state, action: PayloadAction<ISchoolDirector[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    director: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getAdministrationThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAdmin[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    administration: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getSocialMediaThunk.fulfilled,
        (state, action: PayloadAction<ISchoolSocialMedia[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    socialMedia: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getPhotosThunk.fulfilled,
        (state, action: PayloadAction<ISchoolPhotos[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    photos: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getClassroomScheduleThunk.fulfilled,
        (state, action: PayloadAction<ISchedule[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    scheduleClassroom: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getTeacherScheduleThunk.fulfilled,
        (state, action: PayloadAction<ISchedule[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    scheduleTeacher: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getClassScheduleThunk.fulfilled,
        (state, action: PayloadAction<ISchedule[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    scheduleClass: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getSectionThunk.fulfilled,
        (state, action: PayloadAction<IKruzhok>) => {
            if (action.payload) {
                return {
                    ...state,
                    sectionId: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getSliderThunk.fulfilled,
        (state, action: PayloadAction<ISlider[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    slider: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getPrideThunk.fulfilled,
        (state, action: PayloadAction<ISchoolPride[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    pride: action.payload,
                };
            }
            return state;
        },
    );
  },
});

export const { actions } = schoolSlice;

export default schoolSlice.reducer;
