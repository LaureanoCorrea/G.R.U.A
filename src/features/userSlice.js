import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		email: null,
		idToken: null,
		localId: null,
		error: null,
	},
	reducers: {
		setUser: (state, actions) => {
			state.email = actions.payload.email || null;
			state.idToken = actions.payload.idToken || null;
			state.localId = actions.payload.localId || null;
			state.error = actions.payload.error || null;
		},
		deleteUser: (state) => {
			state.email = '';
			state.idToken = '';
			state.localId = '';
		},
	},
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
