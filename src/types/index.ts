export interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: string
	images: string[]
	thumbnail: string
}

export interface IUsers {
	id: number
	firstName: string
	lastName: string
	age: string
	email: string
	image: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone: string
	website: string
	company: {
		name: string
		catchPhrase: string
		bs: string
	}
}

export interface IPost {
	id: number
	title: string
	body: string
	userId: number
	reactions: {
		likes: number
		dislikes: number
	}
	tags: string[]
}
export interface ITodo {
	id: number
	todo: string
	completed: boolean
	userId: number
}
