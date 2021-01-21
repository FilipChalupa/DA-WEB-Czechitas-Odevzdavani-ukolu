import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

export const Header: React.FunctionComponent = () => {
	return (
		<AppBar position="static" color="inherit">
			<Toolbar>
				<Link href="/">
					<a>
						<Typography variant="h5">Odevzdávání úkolů</Typography>
					</a>
				</Link>
			</Toolbar>
		</AppBar>
	)
}
