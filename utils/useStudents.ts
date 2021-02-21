import React from 'react'
import { onAll } from 'typesaurus'
import { useCourse } from '../contexts/CourseContext'
import { Student, studentsCollection } from './db'

export function useStudents() {
	const [students, setStudents] = React.useState<Student[]>([])
	const courseId = useCourse().id

	React.useEffect(() => {
		return onAll(studentsCollection(courseId), (data) => {
			setStudents(data.map((item) => item.data))
		})
	}, [courseId])

	return students
}
