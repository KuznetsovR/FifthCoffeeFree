import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyD8pk8gba4qmoQdUu-6teuxoAIzzpsAMPI",
    authDomain: "fifth-coffee-free.firebaseapp.com",
    projectId: "fifth-coffee-free",
    storageBucket: "fifth-coffee-free.appspot.com",
    messagingSenderId: "367578660753",
    appId: "1:367578660753:web:b482c2e4a0b85d12e4a430",
    measurementId: "G-Y3D6M8YEB9"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Coffee</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}



function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt', 'desc').limit(1);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const { uid, photoURL } = auth.currentUser;
    const addCup = () => {
        let cups = messages[0].cups;
        if (cups === 5){
            return
        } else if(!cups){
            cups = 1
        } else {
            cups++
        }
        messagesRef.add({
            cups,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
    }

    const getFreeCup = () => {
        let cups = messages[0].cups;
        if (cups !== 5) return;
        messagesRef.add({
            cups: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
    }

  return (<>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </main>

    <div className="btns-container">
      <button className="btn" disabled={messages? messages[0].cups === 5: false} onClick={addCup}>Add cup</button>
      <button className="btn" disabled={messages? messages[0].cups !== 5: true} onClick={getFreeCup}>Get free cup</button>
    </div>
  </>)
}


function ChatMessage(props) {
    const { cups, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';


    const activeCups = []
    for (let i = 0; i < 5; i++){
        if (i>=cups){
            activeCups.push(<span role={'img'} className={'half-transparent'} aria-label={'coffee cup'}>☕</span>)
            continue
        }
        activeCups.push(<span role={'img'} aria-label={'coffee cup'}>☕</span>)
    }


    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt={'profile'}/>
            <p>
                {cups === 5?

                    <div>Congratulations! You can get a free cup whenever you want!</div>
                    :
                    <div>You need to get {5-cups} more cup{5-cups === 1? null: 's'} for a free coffee!</div>
                }
                {activeCups}
            </p>
        </div>
    </>)
}


export default App;
