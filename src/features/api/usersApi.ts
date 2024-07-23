import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { apiDomain } from '../../utils/utils';
import { FormValues } from '../../types/Types';


export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['User']
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        userlogin: builder.mutation({
            query: (loginData:FormValues) => ({
                url: 'auth/login',
                method: 'POST',
                body:loginData
            }),
        }),
        adminlogin: builder.mutation({
            query: (loginData:FormValues) => ({
                url: 'auth/login',
                method: 'POST',
                body:loginData
            }),
        }),
        register: builder.mutation({
            query: (registerData:FormValues) => ({
                url: 'auth/register',
                method: 'POST',
                body:registerData
            }),
        }),

        updateUser: builder.mutation({
            query: ({id, ...body}) => ({
                url: `users/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        })
    })
});