import { database } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['updateImageProfile', 'updateLocation'],
	baseQuery: fetchBaseQuery({ baseUrl: database }),
	endpoints: (builder) => ({
		patchImageProfile: builder.mutation({
			query: ({ localId, image }) => ({
				url: `users/${localId}.json`,
				method: 'PATCH',
				body: { image },
			}),
			invalidatesTags: ['updateImageProfile'],
		}),
		patchLocation: builder.mutation({
			query: ({ localId, address, location }) => ({
				url: `users/${localId}.json`,
				method: 'PATCH',
				body: { address, location },
			}),
			invalidatesTags: ['updateLocation'],
		}),
		getuser: builder.query({
			query: ({ localId }) => `users/${localId}.json`,
			providesTags: ['updateImageProfile', 'updateLocation'],
		}),
	}),
});

export const {
	usePatchImageProfileMutation,
	useGetuserQuery,
	usePatchLocationMutation,
} = userApi;
