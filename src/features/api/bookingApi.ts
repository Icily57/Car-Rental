import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { apiDomain } from '../../utils/utils';
import { BookingFormInputs, BookingResponse } from '../../types/Types';


export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['Booking'],
    endpoints: (builder) => ({
        getBookings: builder.query({
            query: () => 'booking',
            providesTags: ['Booking']
        }),
        approveBooking: builder.mutation({
            query: ({id,...booking}) => ({
                url: `booking/approve/${id}`,
                method: 'PUT',
                body: booking
            }),
            invalidatesTags: ['Booking']
        }),
        declineBooking: builder.mutation({
            query: (id) => ({
                url: `booking/decline/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Booking']
        }),
        createBooking: builder.mutation<BookingResponse, Partial<BookingResponse>>({
            query: (bookinPayload: BookingFormInputs) => ({
                url: 'booking',
                method: 'POST',
                body:bookinPayload
            }),
            invalidatesTags: ['Booking']
        }),
        getBookingsByUserId: builder.query({
            query: (user_id) => `bookings-by-user/${user_id}`,
            providesTags: ['Booking']
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