import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { apiDomain } from '../../utils/utils';


export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['Booking'],
    endpoints: (builder) => ({
        getBookings: builder.query({
            query: () => 'booking',
            providesTags: ['Booking']
        }),
        createBooking: builder.mutation({
            query: (body) => ({
                url: 'booking',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Booking']
        }),
        updateBooking: builder.mutation({
            query: ({id, ...body}) => ({
                url: `booking/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Booking']
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `booking/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Booking']
        })
    })
});