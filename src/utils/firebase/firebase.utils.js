import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfKYzlqgmzUrE8EeueikN9rPs4MqEPrME",
  authDomain: "crwn-clothing-db-16a78.firebaseapp.com",
  projectId: "crwn-clothing-db-16a78",
  storageBucket: "crwn-clothing-db-16a78.appspot.com",
  messagingSenderId: "726055792374",
  appId: "1:726055792374:web:9db4b94ff1580daeb6c6d7",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const creratedAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creratedAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
