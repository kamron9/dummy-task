import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import { postApi } from '../service/postService'
import { productApi } from '../service/productService'
import { todoApi } from '../service/todoService'
import { userApi } from '../service/userService'

const store = configureStore({
	reducer: {
		auth: authReducer,
		[productApi.reducerPath]: productApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[postApi.reducerPath]: postApi.reducer,
		[todoApi.reducerPath]: todoApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(productApi.middleware)
			.concat(userApi.middleware)
			.concat(postApi.middleware)
			.concat(todoApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
