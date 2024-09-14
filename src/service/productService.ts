import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	tagTypes: ['User'],
	endpoints: builder => ({
		getProduct: builder.query({
			query: searchQuery => ({
				url: 'products/search',
				params: {
					q: searchQuery,
				},
			}),
		}),
	}),
})

export const { useGetProductQuery } = productApi
