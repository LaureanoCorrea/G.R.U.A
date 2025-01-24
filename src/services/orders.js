import { database } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl: database }),
	tagTypes: ['newOrders', 'deleteOrders'],
	endpoints: (builder) => ({
		postOrders: builder.mutation({
			query: ({ order, localId }) => ({
				url: `orders/${localId}.json`,
				method: 'POST',
				body: order,
			}),
			invalidatesTags: ['newOrders', 'deleteOrders'],
		}),
		getOrdersUser: builder.query({
			query: ({ localId }) => `orders/${localId}.json`,
			transformResponse: (response) => {
				if (!response) {
					return null;
				}
				const data = Object.entries(response).map((item) => ({
					...item[1],
					id: item[0],
				}));
				return data;
			},
			providesTags: ['newOrders', 'deleteOrders'],
		}),
		deleteOrder: builder.mutation({
			query: ({ localId, orderId }) => ({
				url: `orders/${localId}/${orderId}.json`,
				method: 'DELETE',
			}),
			invalidatesTags: ['newOrders', 'deleteOrders'],
		}),
	}),
});

export const {
	usePostOrdersMutation,
	useGetOrdersUserQuery,
	useDeleteOrderMutation,
} = ordersApi;
