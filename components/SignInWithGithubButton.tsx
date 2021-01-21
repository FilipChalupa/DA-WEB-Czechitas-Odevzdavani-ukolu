import { Button } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import React from 'react'

export const SignInWithGithubButton: React.FunctionComponent = (props) => {
	return (
		<>
			<Button
				variant="contained"
				onClick={() => alert('@TODO')}
				startIcon={<GitHubIcon />}
			>
				Přihlásit se přes GitHub
			</Button>
		</>
	)
}
