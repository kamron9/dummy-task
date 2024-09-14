import { createSlice } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface IPayload {
	username: string
	password: string
}

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (paylaod: IPayload) => {
		const response = await axios.post('https://dummyjson.com/auth/login', {
			username: paylaod.username,
			password: paylaod.password,
		})
		return response.data
	}
)

const initialState = {
	user: null,
	isAuthenticated: localStorage.getItem('token') ? true : false,
	isLoading: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload
			state.isAuthenticated = true
		},
		logout: state => {
			state.user = null
			state.isAuthenticated = false
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isAuthenticated = true
			state.user = action.payload
			state.isLoading = false
			localStorage.setItem('token', JSON.stringify(action.payload.token))
			localStorage.setItem(
				'refreshToken',
				JSON.stringify(action.payload.refreshToken)
			)
			console.log('User:', action.payload)
		})
		builder.addCase(loginUser.rejected, state => {
			state.isAuthenticated = false
			state.isLoading = false
		})
		builder.addCase(loginUser.pending, state => {
			state.isLoading = true
		})
	},
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
