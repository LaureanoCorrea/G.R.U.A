import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products.json';
import categories from '../data/categories.json';

export const shopSlice = createSlice({
	name: 'shop',
	initialState: {
		categories: categories,
		products: products,
		productFilteredByCategory: [],
		productSelected: {},
	},
	reducers: {
		filterByCategory: (state, action) => {
			if (typeof action.payload !== 'string') return;

			state.productFilteredByCategory = Array.isArray(state.products)
				? state.products.filter((product) => {
						if (!product.category) return false;
						return Object.keys(product.category).includes(action.payload);
				  })
				: [];
		},
	},
});

export const { filterByCategory } = shopSlice.actions;

export default shopSlice.reducer;
