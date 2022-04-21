import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/quizSlice";
import answerReducer from "./slices/answerSlice";

const reducers = combineReducers({
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer
})

const persistConfig = {
    key: "root",
    blacklist: ['questions', "answers"],
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})