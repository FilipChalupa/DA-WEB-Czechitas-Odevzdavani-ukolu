import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { AdminDashboard } from '../components/AdminDashboard'
import { LogOutButton } from '../components/LogOutButton'
import { SignInWithGithubButton } from '../components/SignInWithGithubButton'
import { useCourse } from '../contexts/CourseContext'
import { useAdmin } from '../contexts/UserContext'

export default function Admin() {
	const course = useCourse()
	const admin = useAdmin()

	return (
		<Container>
			{admin ? (
				<>
					<Typography variant="h3" gutterBottom>
						Admin
					</Typography>
					<AdminDashboard />
					<br />
					<LogOutButton />
				</>
			) : (
				<>
					<Typography variant="h3">Admin přihlášení</Typography>
					<Typography variant="h4" gutterBottom>
						{course.name}
					</Typography>
					<SignInWithGithubButton />
				</>
			)}
		</Container>
	)
}
