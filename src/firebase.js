import { initializeApp } from "firebase/app";
import{getFireStore} from "@firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyDGlcVvWTJ4XrpqHovDKon0RkyUJPhG5Ik",
	authDomain: "clip-code.firebaseapp.com",
	projectId: "clip-code",
	storageBucket: "clip-code.appspot.com",
	messagingSenderId: "795496571169",
	appId: "1:795496571169:web:036207f7a37bcdeeb41e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFireStore(app);
