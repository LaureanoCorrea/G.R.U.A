import { database } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery({ baseUrl: database }),
	tagTypes: ['addProducts', 'deleteProducts'],
	endpoints: (builder) => ({
		getCart: builder.query({
			query: ({ localId }) => `carts/${localId}.json`,
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
			providesTags: ['addProducts', 'deleteProducts'],
		}),
		getProduct: builder.query({
			query: ({ localId, productId }) => `carts/${localId}/${productId}.json`,
			providesTags: ['addProducts', 'deleteProducts'],
		}),
		addToCart: builder.mutation({
			query: ({ localId, cartProduct }) => ({
				url: `carts/${localId}/${cartProduct.id}.json`,
				method: 'PUT',
				body: cartProduct,
			}),
			invalidatesTags: ['addProducts'],
		}),
		deleteFromCart: builder.mutation({
			query: ({ localId, cartId }) => ({
				url: `carts/${localId}/${cartId}.json`,
				method: 'DELETE',
			}),
			invalidatesTags: ['deleteProducts'],
		}),
		cleanCart: builder.mutation({
			query: ({ localId }) => ({
				url: `carts/${localId}.json`,
				method: 'DELETE',
			}),
			invalidatesTags: ['deleteProducts'],
		}),
	}),
});

export const {
	useGetCartQuery,
	useAddToCartMutation,
	useDeleteFromCartMutation,
	useCleanCartMutation,
	useGetProductQuery,
} = cartApi;
