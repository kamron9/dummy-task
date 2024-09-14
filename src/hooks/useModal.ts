import { useState } from 'react'
import { IPost } from '../types'

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<IPost | null>(null)

	const openModal = (content: IPost | null) => {
		setData(content)
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
		setData(null)
	}

	return { isOpen, openModal, closeModal, data }
}
export default useModal
