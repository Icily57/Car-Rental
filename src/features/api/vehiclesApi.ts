import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../utils/utils';
import { VehicleForm, VehicleSpecs, VehicleSpecsFormValues } from '../../types/Types';

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['vehicle', 'vehicles'],
    endpoints: (builder) => ({
        getVehicles: builder.query({
            query: () => 'vehicleSpecs',
            providesTags: ['vehicle']
        }),
        getVehiclesWithTheirDetails: builder.query({
            query: () => 'vehicleswithdetails',
            providesTags: ['vehicles']
        }),
        getOneVehicleWithDetailsById: builder.query({
            query: (vehicle_id) => `vehicle-with-specs/${vehicle_id}`,
            providesTags: ['vehicles']
        }),
        getVehicle: builder.query({
            query: (id) => `vehicleSpecs/${id}`,
            providesTags: ['vehicle']
        }),
        createVehicle: builder.mutation({
            query: (addCarPayload) => ({
                url: 'vehicleSpecs',
                method: 'POST',
                body:addCarPayload
            }),
            invalidatesTags: ['vehicle']
        }),
        addCar: builder.mutation<VehicleForm,Partial<VehicleForm>>({
            query: (addCarPayload:VehicleForm) => ({
                url: 'vehicle',
                method: 'POST',
                body:addCarPayload
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
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `vehicle/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['vehicle']
        }),
        getVehicleSpecs: builder.query({    
            query: () => 'vehicleSpecs',
            providesTags: ['vehicle']
        }),
        addSpecs: builder.mutation<VehicleSpecs,Partial<VehicleSpecs>>({
            query: (addSpecsPayload:VehicleSpecsFormValues) => ({
                url: 'vehicleSpecs',
                method: 'POST',
                body:addSpecsPayload
            }),
            invalidatesTags: ['vehicle']
        }),
        deleteSpecs: builder.mutation({
            query: (id) => ({
                url: `vehicleSpecs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['vehicle']
        }),
    })
});

