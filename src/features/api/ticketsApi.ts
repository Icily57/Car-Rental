import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../utils/utils';

export const ticketsApi = createApi({
    reducerPath: 'ticketsApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['Ticket'],
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => 'customerSupportTickets',
            providesTags: ['Ticket']
        }),
        getTicket: builder.query({
            query: (id) => `customerSupportTickets/${id}`,
            providesTags: ['Ticket']
        }),
        getTicketsByUserId: builder.query({
            query: (user_id) => `tickets-by-user/${user_id}`,
            providesTags: ['Ticket']
        }),
        createTicket: builder.mutation({
            query: (body) => ({
                url: 'customerSupportTickets',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Ticket']
        }),
        updateTicket: builder.mutation({
            query: ({id, ...body}) => ({
                url: `customerSupportTickets/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Ticket']
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `customerSupportTickets/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Ticket']
        })
    })
});