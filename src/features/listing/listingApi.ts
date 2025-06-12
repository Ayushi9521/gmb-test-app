import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/axiosBaseQuery';

export const listingApi = createApi({
     reducerPath: 'listingApi',
      baseQuery: axiosBaseQuery(),
       endpoints: (builder) => ({
    getListings: builder.query<any, { page?: number; search?: string; filters?: Record<string, any> }>({
      query: ({ page = 1, search = '', filters = {} }) => ({
        url: '/listings',
        method: 'GET',
        params: { page, search, ...filters },
      }),
    }),
  }),
})

export const { useGetListingsQuery } = listingApi;