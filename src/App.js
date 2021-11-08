import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import ChatRoom from './components/ChatRoom/ChatRoom';
import {useDocumentData} from "react-firebase-hooks/firestore";
import UserList from "./components/UserList/UserList";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);
    let doc = null
    if (user?.uid) doc = firestore.collection('users').doc(user.uid)
    const [userData] = useDocumentData(doc);
    let userView = null;
    if (userData?.role === 'admin') {
        userView = (
            <UserList />
        )
    } else if (userData?.role === 'user'){
        userView = (
            <ChatRoom />
        )
    }
  return (
    <div className="App">
      <header>
        <h1>Coffee</h1>
        <SignOut />
      </header>
    
            {user ?
                userView
                :<section>
                    <SignIn />
                </section>
            }

    </div>
  );
}

export default App;
