import { FC } from 'react'
import { IPost } from '../../types'

interface IPostModal {
	isOpen: boolean
	data: IPost | null
	closeModal: () => void
}

const PostModal: FC<IPostModal> = ({ isOpen, closeModal, data }) => {
	const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}
	return (
		<>
			{isOpen && (
				<div
					onClick={handleClose}
					className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'
				>
					<div className='bg-white p-6 rounded-lg max-w-2xl w-full'>
						<h2 className='text-xl font-semibold mb-2'>{data?.title}</h2>
						<p className='text-gray-700 mb-4'>{data?.body}</p>
						<div className='text-sm text-gray-500 mb-4'>
							<p>Like: {data?.reactions.likes}</p>
							<p>Dislike: {data?.reactions.dislikes}</p>
							<p>Tags: {data?.tags.join(', ')}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p className='text-gray-500 text-sm'>User ID: {data?.userId}</p>
							<button
								onClick={closeModal}
								className='px-3 py-2 bg-gray-300 rounded-lg text-sm'
							>
								Yopish
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default PostModal
