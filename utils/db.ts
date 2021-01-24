import { collection, subcollection } from 'typesaurus'
import './firebase'

export type Course = { name: string }

export type Student = {
	name: string
	githubUsername: string
	email: string
	avatar: string | null
}

export const coursesCollection = collection<Course>('courses')

export const studentsCollection = subcollection('students', coursesCollection)
