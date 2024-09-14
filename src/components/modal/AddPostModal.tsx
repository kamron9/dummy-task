import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAddPostMutation } from '../../service/postService'
import { IPost } from '../../types'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	data: IPost | null
}

const AddPostModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [addPost] = useAddPostMutation()

	const handleSubmit = async () => {
		try {
			await addPost({
				title,
				body,
				userId: 1,
				reactions: { likes: 5, dislikes: 1 },
				tags: [],
			}).unwrap()
			setTitle('')
			setBody('')
			onClose()
			toast.success('Post added successfully')
		} catch (error) {
			toast.error('Failed to add the post')
		}
	}

	useEffect(() => {
		if (data) {
			setTitle(data.title)
			setBody(data.body)
		}
	}, [data])
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative'>
				<h2 className='text-xl font-semibold mb-4'>Add New Post</h2>
				<button
					className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
					onClick={onClose}
				>
					&times;
				</button>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-gray-700 font-medium mb-2'
					>
						Title
					</label>
					<input
						type='text'
						id='title'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='body'
						className='block text-gray-700 font-medium mb-2'
					>
						Body
					</label>
					<textarea
						id='body'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
						value={body}
						onChange={e => setBody(e.target.value)}
						rows={4}
					></textarea>
				</div>
				<button
					onClick={handleSubmit}
					className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
				>
					Add Post
				</button>
			</div>
		</div>
	)
}

export default AddPostModal
