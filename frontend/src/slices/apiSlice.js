import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Group', 'User'],
    endpoints: (builder) => ({
        // getGroups: builder.query({
        //     query: () => '/api/groups',
        //     providesTags: ['Group'],
        // }),
        // getGroup: builder.query({
        //     query: (id) => `/api/groups/${id}`,
        //     providesTags: ['Group'],
        // }),
        // createGroup: builder.mutation({
        //     query: (group) => ({
        //         url: '/api/groups',
        //         method: 'POST',
        //         body: group,
        //     }),
        //     invalidatesTags: ['Group'],
        // }),
        // updateGroup: builder.mutation({
        //     query: ({ id, ...patch }) => ({
        //         url: `/api/groups/${id}`,
        //         method: 'PUT',
        //         body: patch,
        //     }),
        //     invalidatesTags: ['Group'],
        // }),
        // deleteGroup: builder.mutation({
        //     query: (id) => ({
        //         url: `/api/groups/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Group'],
        // }),
        // getUser: builder.query({
        //     query: (id) => `/api/users/${id}`,
        //     providesTags: ['User'],
        // }),
    }),
});