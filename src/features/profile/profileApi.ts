import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/axiosBaseQuery';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery(),
tagTypes: ['Profile'], // <--- REQUIRED for tags to work
   endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => ({ url: '/v1/get-user-profile', method: 'GET' }),
      transformResponse: (response: any) => response.data.profileDetails,
     providesTags: ['Profile'],
    }),  
    updateProfile: builder.mutation<any, Partial<ProfileData>>({
      query: (body) => ({
        url: '/v1/update-profile',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;

// Type declaration for profile (you can move it to profileTypes.ts)
export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  profilePic: string;
  language: string;
  timezone: string;
  planExpDate: string;
  planName: string;
  dashboardType: number;
  password: string;
}