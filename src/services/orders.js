import { database } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl: database }),
	endpoints: (builder) => ({
		postOrder: builder.mutation({
			query: ({ ...order }) => ({
				url: `orders.json`,
				method: 'POST',
				body: order,
			}),
		}),
	}),
});

export const { usePostOrderMutation } = ordersApi;
