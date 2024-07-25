import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { apiDomain } from '../../utils/utils';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: () => 'payment',
            providesTags: ['Payment']
        }),
        getPaymentsByUserId: builder.query({
            query: (userId) => `payment-by-id/${userId}`,
            providesTags: ['Payment']
        }),
        getPayment: builder.query({
            query: (id) => `payment/${id}`,
            providesTags: ['Payment']
        }),
        createPayment: builder.mutation({
            query: (body) => ({
                url: 'payment',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Payment']
        }),
        updatePayment: builder.mutation({
            query: ({id, ...body}) => ({
                url: `payment/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Payment']
        }),
        updatePaymentStatus: builder.mutation({
            query: ({id, ...body}) => ({
                url: `payment/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Payment']
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `payment/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Payment']
        })
    })
});