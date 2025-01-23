import { database } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({
	reducerPath: 'shopApi',
	baseQuery: fetchBaseQuery({ baseUrl: database }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (category) =>
				`products.json?orderBy="categories/${category}"&equalTo=true`,
		}),
		getCategories: builder.query({
			query: () => 'categories.json',
		}),
	}),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = shopApi;
