import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const fleetApi = createApi({
  reducerPath: "vehiclesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8000", // Replace with your real API base URL
  }),
  tagTypes: ["Vehicles"], // Define the tag type properly
  endpoints: (builder) => ({
    getVehiclesWithDetails: builder.query({
      query: () => "/vehicleswithdetails", // API endpoint for fetching vehicles
      providesTags: (result) =>
        result
          ? [...result.map(({ id }: { id: string }) => ({ type: "Vehicles", id })), { type: "Vehicles", id: "LIST" }]
          : [{ type: "Vehicles", id: "LIST" }],
    }),
  }),
});

// Auto-generated hook
// export const { useGetVehiclesWithDetailsQuery } = fleetApi;
