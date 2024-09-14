import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

interface SearchProps {
	onSearch: (query: string) => void
	placeholder: string
}

const Search: FC<SearchProps> = ({ onSearch, placeholder }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const handleSearch = (e: React.FormEvent) => {
		const query = (e.target as HTMLInputElement).value
		e.preventDefault()
		onSearch(query)
		searchParams.set('q', query)
		if (query === '') searchParams.delete('q')
		setSearchParams(searchParams)
	}
	return (
		<div className='py-6'>
			<input
				type='text'
				onChange={handleSearch}
				placeholder={placeholder}
				className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
		</div>
	)
}

export default Search
