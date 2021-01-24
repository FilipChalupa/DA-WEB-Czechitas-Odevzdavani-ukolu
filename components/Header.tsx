import {
	AppBar,
	Avatar,
	Container,
	Toolbar,
	Typography,
} from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { useUser } from '../contexts/UserContext'
import s from './Header.module.css'

export const Header: React.FunctionComponent = () => {
	const user = useUser()

	return (
		<AppBar position="static" color="inherit">
			<Container disableGutters>
				<Toolbar>
					<div className={s.main}>
						<Link href="/">
							<a>
								<Typography variant="h5">Odevzdávání úkolů</Typography>
							</a>
						</Link>
					</div>
					{user && (
						<a href={`https://github.com/${user.githubUsername}`}>
							<Avatar src={user.avatar || undefined} />
						</a>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}
