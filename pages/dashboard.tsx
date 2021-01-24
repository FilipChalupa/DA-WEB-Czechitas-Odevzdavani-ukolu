import { Typography } from '@material-ui/core'
import React from 'react'
import { LogOutButton } from '../components/LogOutButton'
import { SignInButton } from '../components/SignInButton'
import { useUser } from '../contexts/UserContext'

export default function Dashboard() {
	const user = useUser()

	return (
		<div>
			<Typography variant="h3">Dashboard</Typography>

			{user ? (
				<>
					<pre>{JSON.stringify(user, null, 2)}</pre>
					<LogOutButton />
				</>
			) : (
				<SignInButton />
			)}
		</div>
	)
}
