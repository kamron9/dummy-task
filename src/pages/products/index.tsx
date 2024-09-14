import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useState } from 'react'
import Search from '../../components/Search'
import SkeletonCard from '../../components/skeletons/Skeleton'
import { useGetProductQuery } from '../../service/productService'
import { IProduct } from '../../types'

const Products = () => {
	const [query, setQuery] = useState('')
	const { data, isLoading, error } = useGetProductQuery(query)

	const handleSearch = (query: string) => {
		setQuery(query)
	}

	if (isLoading) {
		return (
			<div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{Array.from({ length: 8 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		)
	}
	if (error)
		return (
			<p className='text-center text-red-500'>
				Xatolik yuz berdi: {(error as FetchBaseQueryError)?.status}
			</p>
		)

	return (
		<>
			<Search placeholder='Search products...' onSearch={handleSearch} />
			<h1 className='text-3xl font-bold mt-2'>Products</h1>

			<div className='py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{data?.products.map((product: IProduct) => (
					<div
						key={product.id}
						className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col'
					>
						<img
							src={product.thumbnail}
							alt={product.title}
							className='w-full h-48 object-cover'
						/>
						<div className='p-4 w-full h-full flex flex-col justify-between'>
							<h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
							<p className='text-gray-700 mb-2 line-clamp-2'>
								{product.description}
							</p>
							<p className='text-lg font-bold text-blue-600'>
								${product.price}
							</p>
						</div>
					</div>
				))}
			</div>
			{!data?.products?.length && (
				<h1 className='text-center'>Product not found</h1>
			)}
		</>
	)
}

export default Products
