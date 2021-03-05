import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { SignInWithGithubButton } from '../components/SignInWithGithubButton'
import { useCourse } from '../contexts/CourseContext'
import { useUser } from '../contexts/UserContext'
import styles from '../styles/Home.module.css'

export default function Home() {
	const course = useCourse()
	const user = useUser()
	const router = useRouter()

	if (user) {
		if (user.isAdmin) {
			router.push('/admin')
		} else {
			router.push('/dashboard')
		}
	}

	return (
		<div className={styles.container}>
			<Typography variant="h3">Přihlášení</Typography>
			<Typography variant="h4" gutterBottom>
				{course.name}
			</Typography>
			<SignInWithGithubButton />
		</div>
	)
}
