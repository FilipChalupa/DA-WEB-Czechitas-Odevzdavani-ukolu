import { Typography } from '@material-ui/core'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { get } from 'typesaurus'
import { SignInWithGithubButton } from '../components/SignInWithGithubButton'
import styles from '../styles/Home.module.css'
import { coursesCollection } from '../utils/db'

export default function Home({
	course,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Odevzdávání úkolů</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3">Přihlášení</Typography>
			<Typography variant="h4" gutterBottom>
				{course.name}
			</Typography>
			<SignInWithGithubButton />
		</div>
	)
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const courseId = process.env.COURSE_ID || ''
	const course = (await get(coursesCollection, courseId))?.data

	if (course === undefined) {
		throw Error('Course not found.')
	}

	return {
		props: {
			course,
		},
	}
}
