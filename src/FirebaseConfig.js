import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDGlcVvWTJ4XrpqHovDKon0RkyUJPhG5Ik",
	authDomain: "clip-code.firebaseapp.com",
	projectId: "clip-code",
	storageBucket: "clip-code.appspot.com",
	messagingSenderId: "795496571169",
	appId: "1:795496571169:web:036207f7a37bcdeeb41e60",
};

class Firebase {
	static instance;

	constructor() {
		if (Firebase.instance) {
			return Firebase.instance;
		}
		this.app = initializeApp(firebaseConfig);
		this.db = getFirestore(this.app);
		this.auth = getAuth(this.app);
		Firebase.instance = this;
	}
}

const firebaseInstance = new Firebase();

// Export Firebase services for use in other parts of the application
export const db = firebaseInstance.db;
export const auth = firebaseInstance.auth;

// Export Firebase auth functions directly for convenience
export { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";