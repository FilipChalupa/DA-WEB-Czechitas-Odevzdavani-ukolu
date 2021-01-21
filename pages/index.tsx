import { Typography } from '@material-ui/core'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { SignInWithGithubButton } from '../components/SignInWithGithubButton'
import styles from '../styles/Home.module.css'

export default function Home({
	courseId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Odevzdávání úkolů</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3">Přihlášení</Typography>
			<p>
				Klíč kurzu: <b>{courseId}</b>
			</p>
			<SignInWithGithubButton />
		</div>
	)
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
	return {
		props: {
			courseId: process.env.COURSE_ID || '',
		},
	}
}
