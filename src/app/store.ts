import { configureStore } from '@reduxjs/toolkit';
// import { listingApi } from '../features/listing/listingApi';
import { profileApi } from '@/features/profile/profileApi';
import {timeZoneApi } from '@/features/timeZone/timeZoneApi';


export const store = configureStore({
    reducer: {
        // [listingApi.reducerPath]: listingApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [timeZoneApi.reducerPath]: timeZoneApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat( 
    // listingApi.middleware,
  profileApi.middleware,
timeZoneApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;