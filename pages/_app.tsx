import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { get } from 'typesaurus'
import { Layout } from '../components/Layout'
import { ThemeProvider } from '../components/ThemeProvider'
import { CourseContextProvider } from '../contexts/CourseContext'
import { UserContextProvider } from '../contexts/UserContext'
import '../styles/globals.css'
import '../styles/hidingHeader.css'
import { coursesCollection } from '../utils/db'
import { UnwrapPromise } from '../utils/UnwrapPromise'

function MyApp({
	Component,
	course,
	pageProps,
}: AppProps & UnwrapPromise<ReturnType<typeof getInitialProps>>) {
	return (
		<ThemeProvider>
			<CourseContextProvider course={course}>
				<UserContextProvider>
					<Layout>
						<Head>
							<title>Odevzdávání úkolů</title>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</UserContextProvider>
			</CourseContextProvider>
		</ThemeProvider>
	)
}

async function getOnlyOnceOnServer<T>(
	key: string,
	getter: () => Promise<T>,
): Promise<T> {
	if ('window' in globalThis) {
		return window.__NEXT_DATA__.props[key] as Exclude<T, undefined>
	}
	return getter()
}

const getInitialProps = async (context: AppContext) => {
	const appProps = await App.getInitialProps(context)

	const course = await getOnlyOnceOnServer('course', async () => {
		const courseId = process.env.COURSE_ID || ''
		const course = (await get(coursesCollection, courseId))?.data
		if (course === undefined) {
			throw Error('Course not found.')
		}
		return {
			id: courseId,
			...course,
		}
	})

	return {
		...appProps,
		course,
	}
}

MyApp.getInitialProps = getInitialProps

export default MyApp
