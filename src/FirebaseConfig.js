import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
	apiKey: "AIzaSyDGlcVvWTJ4XrpqHovDKon0RkyUJPhG5Ik",
	authDomain: "clip-code.firebaseapp.com",
	projectId: "clip-code",
	storageBucket: "clip-code.appspot.com",
	messagingSenderId: "795496571169",
	appId: "1:795496571169:web:036207f7a37bcdeeb41e60"
};
// Initialize Firebase
let db
try {
	const app = initializeApp(firebaseConfig);
	 db = getFirestore(app);

	// Your code using the 'app' and 'db' variables goes here

	console.log("Firebase initialization successful");
} catch (error) {
	console.error("Error initializing Firebase:", error.message);
}
export { db }
