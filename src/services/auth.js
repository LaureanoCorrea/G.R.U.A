import { auth_base_url, apiKey } from '../database';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: auth_base_url }),
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: (credentials) => ({
				url: `accounts:signUp?key=${apiKey}`,
				method: 'POST',
				body: credentials,
			}),
		}),
		signIn: builder.mutation({
			query: (credentials) => ({
				url: `accounts:signInWithPassword?key=${apiKey}`,
				method: 'POST',
				body: credentials,
			}),
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
