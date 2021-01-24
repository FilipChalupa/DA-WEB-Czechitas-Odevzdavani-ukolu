import React from 'react'
import { Course } from '../utils/db'

interface CourseData extends Course {
	id: string
}

const CourseContext = React.createContext<CourseData>(
	null as any /* Vždy nastaveno v MyApp */,
)

export const CourseContextProvider: React.FunctionComponent<{
	course: CourseData
}> = ({ course, children }) => (
	<CourseContext.Provider value={course}>{children}</CourseContext.Provider>
)

export const useCourse = (): CourseData => React.useContext(CourseContext)
