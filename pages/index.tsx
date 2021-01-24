import { Typography } from '@material-ui/core'
import Head from 'next/head'
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
		router.push('/dashboard')
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Odevzdávání úkolů</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3">Přihlášení</Typography>
			<Typography variant="h4" gutterBottom>
				{course.name}
			</Typography>
			<SignInWithGithubButton />
		</div>
	)
}
