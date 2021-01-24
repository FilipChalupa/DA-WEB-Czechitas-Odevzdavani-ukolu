import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { firebaseAuth } from '../utils/firebase'

export const LogOutButton: React.FunctionComponent = () => {
	const router = useRouter()

	const logOut = React.useCallback(async () => {
		await firebaseAuth.signOut()
		router.push('/')
	}, [])

	return (
		<Button onClick={() => logOut()} variant="contained">
			Odhlásit se
		</Button>
	)
}
