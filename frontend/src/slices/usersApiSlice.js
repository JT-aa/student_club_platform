import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => USERS_URL,
            keepUnusedDataFor: 5,
        }),
        getUser: builder.query({
            query: (id) => `${USERS_URL}/${id}`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
} = usersApiSlice;

