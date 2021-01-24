import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDf1O-FP-ZsMp-ubDD2CqLftQrBwVLpCe8',
	authDomain: 'czechitas-ukoly.firebaseapp.com',
	projectId: 'czechitas-ukoly',
	storageBucket: 'czechitas-ukoly.appspot.com',
	messagingSenderId: '153475777536',
	appId: '1:153475777536:web:c46e066aa02ee3a4b744e5',
}

const app =
	firebase.apps.length === 0
		? firebase.initializeApp(firebaseConfig)
		: firebase.app()

export const firebaseAuth = app.auth()

export const firebaseAuthGithubProvider = new firebase.auth.GithubAuthProvider()
