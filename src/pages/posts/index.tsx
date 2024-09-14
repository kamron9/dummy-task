import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import AddPostModal from '../../components/modal/AddPostModal'
import PostModal from '../../components/modal/PostModal'
import SkeletonCard from '../../components/skeletons/SkeletonCard'
import useModal from '../../hooks/useModal'
import { useGetPostsQuery } from '../../service/postService'
import { IPost } from '../../types'

const Posts = () => {
	const { data, isLoading, error } = useGetPostsQuery('')
	const { openModal, closeModal, data: postData, isOpen } = useModal()
	const {
		openModal: openAddModal,
		closeModal: closeAddModal,
		isOpen: onOpen,
		data: editPostData,
	} = useModal()

	if (isLoading) {
		return (
			<div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		)
	}

	if (error) {
		return (
			<p className='text-center text-red-500'>
				Xatolik yuz berdi:{(error as FetchBaseQueryError)?.status}
			</p>
		)
	}

	const handleAddPost = () => {
		openAddModal(null)
	}
	const handleEditPost = (post: IPost) => {
		openAddModal(post)
	}
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold my-6'>Posts</h1>
				<button
					className='px-4 py-2 bg-blue-500 rounded-lg text-white'
					onClick={handleAddPost}
				>
					Add post
				</button>
			</div>
			<div className='py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{data?.posts.map((post: IPost) => (
					<div
						key={post.id}
						className='bg-white flex flex-col justify-between shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'
					>
						<div>
							<h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
							<p className='text-gray-700 mb-4 line-clamp-4'>{post.body}</p>
						</div>
						<div className='text-sm text-gray-500 mb-4'>
							<p>Like: {post.reactions.likes}</p>
							<p>Dislike: {post.reactions.dislikes}</p>
							<p>Tags: {post.tags.join(', ')}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p className='text-gray-500 text-sm'>User ID: {post.userId}</p>
							<button
								onClick={() => openModal(post)}
								className='px-3 py-2 bg-gray-300 rounded-lg text-sm'
							>
								Ko'proq o'qish
							</button>
						</div>
						<div>
							<button
								className='text-purple-500'
								onClick={() => handleEditPost(post)}
							>
								o'zgartirish
							</button>
						</div>
					</div>
				))}
			</div>
			<PostModal closeModal={closeModal} data={postData} isOpen={isOpen} />
			<AddPostModal
				isOpen={onOpen}
				onClose={closeAddModal}
				data={editPostData}
			/>
		</div>
	)
}

export default Posts
