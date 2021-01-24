import { collection } from 'typesaurus'
import './firebase'

type Course = { name: string }

export const coursesCollection = collection<Course>('courses')
