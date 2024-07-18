import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../utils/utils';

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['vehicle'],
    endpoints: (builder) => ({
        getVehicles: builder.query({
            query: () => 'vehicleSpecs',
            providesTags: ['vehicle']
        }),
        getVehicle: builder.query({
            query: (id) => `vehicleSpecs/${id}`,
            providesTags: ['vehicle']
        }),
        createVehicle: builder.mutation({
            query: (body) => ({
                url: 'vehicleSpecs',
                method: 'POST',
                body
            }),
            invalidatesTags: ['vehicle']
        }),
        updateVehicle: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `vehicleSpecs/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vehicle']
        }),
        deleteVehicle: builder.mutation({
            query: (id) => ({
                url: `vehicleSpecs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['vehicle']
        })
    })
});

// export const {
//     useGetVehiclesQuery,
//     useGetVehicleQuery,
//     useCreateVehicleMutation,
//     useUpdateVehicleMutation,
//     useDeleteVehicleMutation
// } = vehiclesApi;
