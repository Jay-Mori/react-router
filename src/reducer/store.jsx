// store.js
import { legacy_createStore } from "redux";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { Reducers as authReducer } from "./auth/reducer";
import { Reducers as dataReducer } from "./products/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  datas: dataReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
