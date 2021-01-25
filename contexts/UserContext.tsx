import React from 'react'
import { get } from 'typesaurus'
import { Admin, Student, studentsCollection } from '../utils/db'
import { firebase, firebaseAuth } from '../utils/firebase'
import { useCourse } from './CourseContext'

type Value =
	| {
			isStudent: true
			isAdmin: false
			student: Student
	  }
	| {
			isStudent: false
			isAdmin: true
			admin: Admin
	  }
	| null

const UserContext = React.createContext<Value>(null)

const firebaseUserToCustom = async (
	courseId: string,
	user: null | firebase.User,
): Promise<Value> => {
	if (user === null) {
		return null
	}
	if (user.uid === 'CUtRqYqyHTOHZCWvrqgCrmvf0Mi1' && user.email) {
		return {
			isStudent: false,
			isAdmin: true,
			admin: {
				id: user.uid,
				avatar: user.photoURL,
				email: user.email,
				name: user.displayName || 'Anonym',
			},
		}
	}
	const student = await get(studentsCollection(courseId), user.uid)
	return (
		student && {
			isStudent: true,
			isAdmin: false,
			student: student.data,
		}
	)
}

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
	const [user, setUser] = React.useState<Value>(null)
	const courseId = useCourse().id

	React.useEffect(() => {
		return firebaseAuth.onAuthStateChanged(async (user) => {
			const customUser = await firebaseUserToCustom(courseId, user)
			setUser(customUser)
		})
	}, [])

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = (): Value => React.useContext(UserContext)

export const useStudent = (): null | Student => {
	const value = React.useContext(UserContext)
	return value?.isStudent ? value.student : null
}

export const useAdmin = (): null | Admin => {
	const value = React.useContext(UserContext)
	return value?.isAdmin ? value.admin : null
}
