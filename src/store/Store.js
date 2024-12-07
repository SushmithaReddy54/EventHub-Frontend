import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./reducers/UserReducers";
import AdminReducers from "./reducers/AdminReducers";
import WorkshopReducers from "./reducers/WorkshopReducers";
import SkillsReducers from "./reducers/SkillsReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage,
};

// Wrap the user reducer with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, UserReducers);

export const Store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: AdminReducers,
    workshop: WorkshopReducers,
    skills: SkillsReducers,
  },
});

export const persistor = persistStore(Store);
