// src/service/userService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	endpoints: builder => ({
		getUsers: builder.query({
			query: searchQuery => ({
				url: 'users/search',
				params: {
					q: searchQuery,
				},
			}),
		}),
	}),
})

export const { useGetUsersQuery } = userApi
