import { combineReducers, configureStore } from "@reduxjs/toolkit";
import schoolSliceReducer from "@/store/slices/school.slice";

const rootReducer = combineReducers({
  schoolInfo: schoolSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const { getState, dispatch } = store;

export type RootState = ReturnType<typeof getState>;
export type AppDispatch = typeof dispatch;
