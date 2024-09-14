import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodo } from '../types'

// `todoApi`ni yaratamiz
export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	tagTypes: ['Todo'],
	endpoints: builder => ({
		getTodos: builder.query<{ todos: ITodo[] }, void>({
			query: () => 'todos',
			providesTags: result =>
				result
					? [
							...result.todos.map(({ id }) => ({ type: 'Todo' as const, id })),
							{ type: 'Todo', id: 'LIST' },
					  ]
					: [{ type: 'Todo', id: 'LIST' }],
		}),
		updateTodo: builder.mutation<ITodo, Partial<ITodo> & { id: number }>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: (_, __, { id }) => [{ type: 'Todo', id }],
		}),
		deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
			query: id => ({
				url: `todos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_, __, id) => [{ type: 'Todo', id }],
		}),
	}),
})

// Hooklarni eksport qilamiz
export const {
	useGetTodosQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todoApi
