import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage/ChatMessage';
import {connect} from "react-redux";
import {setState} from "../../state/cupsAmount.actions";
const auth = firebase.auth();
const firestore = firebase.firestore();


function ChatRoom(props) {
    let { uid } = auth.currentUser;
    const doc = firestore.collection('users').doc(uid)
    const [userData] = useDocumentData(doc);
    props.onSetState(userData)



    return (
        <main>
            {props.cups !== undefined && props.cups !== null ? <ChatMessage userData={props} />: null}
        </main>
    )
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
        onSetState: (newState) => dispatch(setState(newState)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
