import React from 'react'
import { get } from 'typesaurus'
import { Student, studentsCollection } from '../utils/db'
import { firebase, firebaseAuth } from '../utils/firebase'
import { useCourse } from './CourseContext'

const UserContext = React.createContext<Student | null>(null)

const firebaseUserToCustom = async (
	courseId: string,
	user: null | firebase.User,
): Promise<Student | null> => {
	if (user === null) {
		return null
	}
	const student = await get(studentsCollection(courseId), user.uid)
	return student && student.data
}

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
	const [user, setUser] = React.useState<Student | null>(null)
	const courseId = useCourse().id

	React.useEffect(() => {
		return firebaseAuth.onAuthStateChanged(async (user) => {
			const customUser = await firebaseUserToCustom(courseId, user)
			setUser(customUser)
		})
	}, [])

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = (): Student | null => React.useContext(UserContext)
