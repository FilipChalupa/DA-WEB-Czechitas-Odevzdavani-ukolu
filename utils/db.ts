import { collection, subcollection } from 'typesaurus'

export type Course = { name: string }

export type Student = {
	id: string
	name: string
	githubUsername: string
	email: string
	avatar: string | null

	task1CodeDone?: Date
	task1Reviewee?: string | null
	task1ReviewDone?: Date
	task1ReviewResponseDone?: Date

	task2CodeDone?: Date
	task2Reviewee?: string | null
	task2ReviewDone?: Date
	task2ReviewResponseDone?: Date

	task3CodeDone?: Date
	task3Reviewee?: string | null
	task3ReviewDone?: Date
	task3ReviewResponseDone?: Date

	task4CodeDone?: Date
	task4Reviewee?: string | null
	task4ReviewDone?: Date
	task4ReviewResponseDone?: Date

	task5CodeDone?: Date
	task5Reviewee?: string | null
	task5ReviewDone?: Date
	task5ReviewResponseDone?: Date

	taskTeamRepositoryLink?: string
	taskTeamCodeDone?: Date
	taskTeamPartner?: string | null
	taskTeamReviewDoneBy?: string
}

export type Admin = {
	id: string
	name: string
	email: string
	avatar: string | null
}

export const coursesCollection = collection<Course>('courses')

export const adminsCollection = collection<Admin>('admin')

export const studentsCollection = subcollection<Student, Course>(
	'students',
	coursesCollection,
)
