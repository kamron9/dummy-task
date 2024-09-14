import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../features/authSlice'
import { AppDispatch, RootState } from '../store'

function LoginForm() {
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()

	const { isAuthenticated, isLoading, user } = useSelector(
		(state: RootState) => state.auth
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(loginUser({ username: 'emilys', password: 'emilyspass' }))
	}
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated, user])
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'
			>
				<h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
					Login
				</h2>

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='username'
					>
						Username
					</label>
					<input
						type='text'
						id='username'
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Enter your username'
						required
					/>
				</div>

				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Enter your password'
						required
					/>
				</div>

				<button
					disabled={isLoading}
					type='submit'
					className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
				>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
			</form>
		</div>
	)
}

export default LoginForm
