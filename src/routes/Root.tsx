import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../pages/Login'
import Posts from '../pages/posts'
import Products from '../pages/products'
import Todos from '../pages/todos'
import Users from '../pages/users'
import ProtectedRoutes from './ProtectedRoutes'

const Root = () => {
	return (
		<>
			<Routes>
				<Route
					element={
						<ProtectedRoutes>
							<Layout />
						</ProtectedRoutes>
					}
				>
					<Route path='/' element={<Posts />} />
					<Route path='/products' element={<Products />} />
					<Route path='/users' element={<Users />} />
					<Route path='/todos' element={<Todos />} />
				</Route>

				<Route path='/login' element={<Login />} />
			</Routes>
			<Toaster />
		</>
	)
}

export default Root
