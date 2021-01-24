import { Typography } from '@material-ui/core'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { SignInWithGithubButton } from '../components/SignInWithGithubButton'
import styles from '../styles/Home.module.css'
import { db } from '../utils/firebase'

export default function Home({
	courseId,
	course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Odevzdávání úkolů</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3">{course?.name}</Typography>
			<Typography variant="h4">Přihlášení</Typography>
			<p>
				Klíč kurzu: <b>{courseId}</b>
			</p>
			<SignInWithGithubButton />
		</div>
	)
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const courseId = process.env.COURSE_ID || ''
	const courseRef = db.collection('courses').doc(courseId)
	const course = await courseRef.get()

	return {
		props: {
			courseId,
			course: course.data(),
		},
	}
}
