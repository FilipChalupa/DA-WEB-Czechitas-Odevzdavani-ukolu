import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

export const SignInButton: React.FunctionComponent = () => {
	return (
		<Link passHref href="/">
			<Button variant="contained">Přihlásit se</Button>
		</Link>
	)
}
