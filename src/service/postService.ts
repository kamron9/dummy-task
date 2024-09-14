// src/service/postService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../types'

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://dummyjson.com/',
	}),
	endpoints: builder => ({
		getPosts: builder.query({
			query: () => 'posts',
		}),
		addPost: builder.mutation<IPost, Omit<IPost, 'id'>>({
			query: newPost => ({
				url: 'posts/add',
				method: 'POST',
				body: newPost,
			}),
		}),
	}),
})

export const { useGetPostsQuery, useAddPostMutation } = postApi
