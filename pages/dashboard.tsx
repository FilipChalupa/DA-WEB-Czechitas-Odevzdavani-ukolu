import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Link,
	Typography,
} from '@material-ui/core'
import { blue, green, grey } from '@material-ui/core/colors'
import React from 'react'
import { LogOutButton } from '../components/LogOutButton'
import { SignInButton } from '../components/SignInButton'
import { useStudent } from '../contexts/UserContext'

export default function Dashboard() {
	const student = useStudent()

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" gutterBottom>
				Přehled
			</Typography>

			{student ? (
				<>
					<Typography variant="h5" gutterBottom>
						Piškvorky
					</Typography>
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: green[500], color: '#ffffff' }}
								>
									1
								</Avatar>
							}
							title="Úvodní obrazovka"
							subheader="splněno"
						/>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								Odkaz na zadání:{' '}
								<Link
									color="secondary"
									href="https://github.com/Czechitas-podklady-WEB/Ukol-Piskvorky-1"
								>
									github.com/…/Ukol-Piskvorky-1
								</Link>
							</Typography>
						</CardContent>
					</Card>
					<br />
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: green[500], color: '#ffffff' }}
								>
									2
								</Avatar>
							}
							title="Pravidla"
							subheader="splněno"
						/>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								Odkaz na zadání:{' '}
								<Link
									color="secondary"
									href="https://github.com/Czechitas-podklady-WEB/Ukol-Piskvorky-2"
								>
									github.com/…/Ukol-Piskvorky-2
								</Link>
							</Typography>
						</CardContent>
					</Card>
					<br />
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: blue[500], color: '#ffffff' }}
								>
									3
								</Avatar>
							}
							title="Herní pole"
							subheader="code review do 10. 2. 2021"
						/>
						<CardContent>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Odkaz na zadání:{' '}
								<Link
									color="secondary"
									href="https://github.com/Czechitas-podklady-WEB/Ukol-Piskvorky-3"
								>
									github.com/…/Ukol-Piskvorky-3
								</Link>
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Napiš na GitHubu review pro:{' '}
								<Link
									color="secondary"
									href="https://example.com/odkaz-na-repozitar"
								>
									Jane Doe
								</Link>{' '}
								<Button size="small" color="primary" variant="contained">
									Komentáře jsem odeslala
								</Button>
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Jak na review:{' '}
								<Link
									href="https://example.com/popis-a-ukazky-code-review"
									color="secondary"
								>
									postup
								</Link>
							</Typography>
						</CardContent>
					</Card>
					<br />
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: blue[500], color: '#ffffff' }}
								>
									4
								</Avatar>
							}
							title="Kolečka a křížky"
							subheader="nakóduj do 16. 2. 2021"
						/>
						<CardContent>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Odkaz na zadání:{' '}
								<Link
									color="secondary"
									href="https://github.com/Czechitas-podklady-WEB/Ukol-Piskvorky-4"
								>
									github.com/…/Ukol-Piskvorky-4
								</Link>
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Vypracuj podle zadání na odkaze výše.{' '}
								<Button size="small" color="primary" variant="contained">
									Mám vypracováno
								</Button>
							</Typography>
						</CardContent>
					</Card>
					<br />
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: grey[500], color: '#ffffff' }}
								>
									5
								</Avatar>
							}
							title="Uzamčeno"
							subheader="bude zadáno 17. 2. 2021"
						/>
					</Card>
					<br />
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: grey[500], color: '#ffffff' }}
								>
									5
								</Avatar>
							}
							title="Uzamčeno"
							subheader="bude zadáno 25. 2. 2021"
						/>
					</Card>
					<br />
					<Typography variant="h5" gutterBottom>
						Práce v týmu
					</Typography>
					<Card>
						<CardHeader
							avatar={
								<Avatar
									style={{ backgroundColor: grey[500], color: '#ffffff' }}
								>
									6
								</Avatar>
							}
							title="Uzamčeno"
							subheader="bude zadáno 4. 3. 2021"
						/>
					</Card>
					<br />
					<br />
					<br />
					<pre>{JSON.stringify(student, null, 2)}</pre>
					<LogOutButton />
				</>
			) : (
				<SignInButton />
			)}
		</Container>
	)
}
