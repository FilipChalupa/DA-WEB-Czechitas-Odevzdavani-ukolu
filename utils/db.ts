import { collection, subcollection } from 'typesaurus'

export type Course = { name: string }

export type Student = {
	id: string
	name: string
	githubUsername: string
	email: string
	avatar: string | null
}

export const coursesCollection = collection<Course>('courses')

export const studentsCollection = subcollection<Student, Course>(
	'students',
	coursesCollection,
)
