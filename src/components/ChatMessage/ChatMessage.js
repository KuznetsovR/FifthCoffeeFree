
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

function ChatMessage(props) {
  const { cups, uid, photoURL } = props.userData;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';


  const activeCups = []
  for (let i = 0; i < 5; i++){
      if (i>=cups){
          activeCups.push(<span role={'img'} key={i} className={'half-transparent'} aria-label={'coffee cup'}>☕</span>)
          continue
      }
      activeCups.push(<span role={'img'} key={i} aria-label={'coffee cup'}>☕</span>)
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

export default ChatMessage;