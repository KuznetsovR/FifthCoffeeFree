import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './SignIn.css'
import firebaseCredentials from '../../credentials/firebaseCredentials.json'
firebase.initializeApp(firebaseCredentials)

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn() {
  const signInWithGoogle = async () => {
      const usersRef = firestore.collection('users');
      const provider = new firebase.auth.GoogleAuthProvider();
      const loginInfo = await auth.signInWithPopup(provider);
      const { uid, photoURL } = auth.currentUser;
      if (loginInfo.additionalUserInfo.isNewUser) await usersRef
          .doc(uid).set({
              fullName: auth.currentUser.displayName,
              email: auth.currentUser.email,
              uid,
              photoURL,
              cups: 0,
              freeCupsGot: 0,
              role: 'user',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

export default SignIn;
