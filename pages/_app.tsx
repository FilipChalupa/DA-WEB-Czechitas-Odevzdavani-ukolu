import App, { AppContext, AppProps } from 'next/app'
import { get } from 'typesaurus'
import { Layout } from '../components/Layout'
import { ThemeProvider } from '../components/ThemeProvider'
import { CourseContextProvider } from '../contexts/CourseContext'
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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CourseContextProvider>
		</ThemeProvider>
	)
}

const getInitialProps = async (context: AppContext) => {
	const appProps = await App.getInitialProps(context)

	const courseId = process.env.COURSE_ID || ''
	const course = (await get(coursesCollection, courseId))?.data
	if (course === undefined) {
		throw Error('Course not found.')
	}

	return {
		...appProps,
		course: {
			id: courseId,
			...course,
		},
	}
}

MyApp.getInitialProps = getInitialProps

export default MyApp
