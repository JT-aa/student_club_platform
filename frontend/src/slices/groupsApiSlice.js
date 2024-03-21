import { GROUPS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const groupsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.query({
            query: () => GROUPS_URL,
            keepUnusedDataFor: 5,
        }),
        getGroup: builder.query({
            query: (id) => `${GROUPS_URL}/${id}`,
            keepUnusedDataFor: 5,
        }),
        createGroup: builder.mutation({
            query: (group) => ({
                url: GROUPS_URL,
                method: 'POST',
                body: group,
            }),
        }),
        updateGroup: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${GROUPS_URL}/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `${GROUPS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getMembers: builder.query({
            query: (id) => `${GROUPS_URL}/${id}/users`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useGetGroupQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useGetMembersQuery,
} = groupsApiSlice;