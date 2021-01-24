import { Button } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import React from 'react'
import { set } from 'typesaurus'
import { useCourse } from '../contexts/CourseContext'
import { Student, studentsCollection } from '../utils/db'
import { firebaseAuth, firebaseAuthGithubProvider } from '../utils/firebase'

export const SignInWithGithubButton: React.FunctionComponent = () => {
	const courseId = useCourse().id

	const signIn = React.useCallback(async () => {
		const result = await firebaseAuth.signInWithPopup(
			firebaseAuthGithubProvider,
		)
		if (
			result.user === null ||
			!result.user.email ||
			!result.additionalUserInfo?.username
		) {
			throw Error('Something went wrong.')
		}
		const userId = result.user.uid
		const userData: Student = {
			id: userId,
			name: result.user.displayName || 'Anonym',
			githubUsername: result.additionalUserInfo.username,
			email: result.user.email,
			avatar: result.user.photoURL,
		}

		await set(studentsCollection(courseId), userId, userData)
	}, [])

	return (
		<>
			<Button variant="contained" onClick={signIn} startIcon={<GitHubIcon />}>
				Přihlásit se přes GitHub
			</Button>
		</>
	)
}
