// src/components/SkeletonCard.js
const SkeletonCard = () => {
	return (
		<div className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'>
			<div className='w-full h-48 bg-gray-200' />
			<div className='p-4'>
				<div className='h-6 bg-gray-200 rounded mb-2' />
				<div className='h-4 bg-gray-200 rounded mb-2' />
				<div className='h-4 bg-gray-200 rounded' />
			</div>
		</div>
	)
}

export default SkeletonCard
