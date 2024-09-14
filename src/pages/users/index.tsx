import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useState } from 'react'
import Search from '../../components/Search'
import SkeletonCard from '../../components/skeletons/SkeletonCard'
import { useGetUsersQuery } from '../../service/userService'
import { IUsers } from '../../types'

const Users = () => {
	const [searchQery, setSearchQuery] = useState('')
	const { data, isLoading, error } = useGetUsersQuery(searchQery)

	const handleSearch = (query: string) => {
		setSearchQuery(query)
	}

	if (isLoading) {
		return (
			<div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		)
	}

	if (error) {
		return (
			<p className='text-center text-red-500'>
				Xatolik yuz berdi: {(error as FetchBaseQueryError)?.status}
			</p>
		)
	}

	return (
		<div>
			<Search placeholder='Search users...' onSearch={handleSearch} />
			<h1 className='text-3xl font-bold mb-6'>Users</h1>
			<div className='py-6 grid grid-cols-1 sm:grid-cols-2 gap-8'>
				{data?.users.map((user: IUsers) => (
					<div
						key={user.id}
						className='bg-white shadow-md rounded-lg flex flex-col lg:flex-row items-center p-4 hover:shadow-lg transition-shadow duration-300'
					>
						<img
							src={user.image}
							alt={user.firstName}
							className='w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6'
						/>
						<div className='flex flex-col text-center sm:text-left'>
							<h2 className='text-xl font-semibold mb-1'>
								{user.firstName} {user.lastName}
							</h2>
							<p className='text-gray-500 mb-1'>{user.email}</p>
							<p className='text-gray-700 mb-1'>Age: {user.age}</p>
							<p className='text-gray-700 mb-1'>Phone: {user.phone}</p>
							<p className='text-gray-500 text-sm'>
								{user.address.city}, {user.address.street}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Users
