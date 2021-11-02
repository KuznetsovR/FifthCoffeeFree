import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage/ChatMessage';
import {connect} from "react-redux";
import {addCup, setCups, setState} from "../../state/cupsAmount.actions";

const auth = firebase.auth();
const firestore = firebase.firestore();


function ChatRoom(props) {
    const { uid } = auth.currentUser;
    const doc = firestore.collection('users').doc(uid)
    const [userData] = useDocumentData(doc);
    props.onSetState(userData)

    const addCup = () => {
        doc.update({
            cups: props.cups + 1,
        })
}

  const getFreeCup = () => {
      if (props.cups !== 5) return;
      doc.update({
          cups: 0,
          freeCupsGot: props.freeCupsGot + 1,
      })
  }

return (<>
  <main>
      {props.cups !== undefined && props.cups !== null ? <ChatMessage userData={props} />: null}
  </main>

    {
        props.role === 'admin'
            ?<div className="btns-container">
                <button className="btn" disabled={props?.cups === 5} onClick={addCup}>Add cup</button>
                <button className="btn" disabled={props?.cups !== 5} onClick={getFreeCup}>Get free cup</button>
            </div>
            : null
    }
</>)
}

function mapStateToProps(state) {
    return {
        cups: state.cups,
        freeCupsGot: state.freeCupsGot,
        uid: state.uid,
        photoURL: state.photoURL,
        role: state.role
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onAdd: () => dispatch(addCup()),
        onSetCups: (newAmount) => dispatch(setCups(newAmount)),
        onSetState: (newState) => dispatch(setState(newState)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
