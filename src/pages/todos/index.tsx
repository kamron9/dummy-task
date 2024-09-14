import toast from 'react-hot-toast'
import {
	useDeleteTodoMutation,
	useGetTodosQuery,
	useUpdateTodoMutation,
} from '../../service/todoService'
import { ITodo } from '../../types'

const Todos = () => {
	const { data, isLoading, error } = useGetTodosQuery()
	const [updateTodo] = useUpdateTodoMutation()
	const [deleteTodo] = useDeleteTodoMutation()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p className='text-red-500'>Xatolik yuz berdi</p>
	}

	const handleCheck = async (todo: ITodo) => {
		try {
			await updateTodo({ id: todo.id, completed: !todo.completed })

			toast.success('Todo muvaffaqiyatli o`zgartirildi')
		} catch (error) {}
	}

	const handleDelete = async (id: number) => {
		try {
			await deleteTodo(id)
			toast.error('Todo muvaffaqiyatli o`chirildi')
		} catch (error) {}
	}

	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold mb-6'>Todos</h1>
			<ul className='space-y-4'>
				{data?.todos.map((todo: ITodo) => (
					<li
						key={todo.id}
						className='bg-white shadow-md p-4 rounded-lg flex justify-between items-center'
					>
						<div className='flex items-center'>
							<input
								type='checkbox'
								defaultChecked={todo.completed}
								onChange={() => handleCheck(todo)}
								className='mr-3'
							/>
							<span
								className={todo.completed ? 'line-through text-gray-500' : ''}
							>
								{todo.todo}
							</span>
						</div>
						<button
							onClick={() => handleDelete(todo.id)}
							className='text-red-500 hover:text-red-700'
						>
							O'chirish
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Todos
