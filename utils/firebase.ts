import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDf1O-FP-ZsMp-ubDD2CqLftQrBwVLpCe8',
	authDomain: 'czechitas-ukoly.firebaseapp.com',
	projectId: 'czechitas-ukoly',
	storageBucket: 'czechitas-ukoly.appspot.com',
	messagingSenderId: '153475777536',
	appId: '1:153475777536:web:c46e066aa02ee3a4b744e5',
}
const app = firebase.apps.length
	? firebase.app()
	: firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore(app)
