import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage/ChatMessage';

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const { uid } = auth.currentUser;
  const doc = firestore.collection('users').doc(uid)
  const [userData] = useDocumentData(doc);
  const addCup = () => {
      let cups = userData?.cups;
      if (cups === 5){
          return
      } else if(!cups){
          cups = 1
      } else {
          cups++
      }
      doc.set({
          ...userData,
          cups
      })
  }

  const getFreeCup = () => {
      let cups = userData.cups;
      if (cups !== 5) return;
      doc.set({
          ...userData,
          cups: 0,
          freeCupsGot: userData.freeCupsGot + 1
      })
  }

return (<>
  <main>
      {userData? <ChatMessage userData={userData} />: null}
  </main>

  <div className="btns-container">
    <button className="btn" disabled={userData?.cups === 5} onClick={addCup}>Add cup</button>
    <button className="btn" disabled={userData?.cups !== 5} onClick={getFreeCup}>Get free cup</button>
  </div>
</>)
}

export default ChatRoom;