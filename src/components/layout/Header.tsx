import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<header className='bg-blue-600 py-4'>
			<div className='container flex justify-between items-center'>
				<div className='text-white text-xl font-bold'>My Website</div>
				<nav>
					<div className='flex space-x-8'>
						<NavLink to='/' className='text-white hover:text-gray-300'>
							Posts
						</NavLink>
						<NavLink to='/products' className='text-white hover:text-gray-300'>
							Products
						</NavLink>
						<NavLink to='/users' className='text-white hover:text-gray-300'>
							Users
						</NavLink>
						<NavLink to='/todos' className='text-white hover:text-gray-300'>
							Todos
						</NavLink>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header
