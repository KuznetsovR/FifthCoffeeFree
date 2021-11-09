import React     from "react";
import 'firebase/firestore';
import {useDocumentData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import {setState} from "../../state/cupsAmount.actions";
import {connect} from "react-redux";
import './AdminActionsOnUser.css'
const firestore = firebase.firestore();


function AdminActionsOnUser(props){
    const doc = firestore.collection('users').doc(props.user.uid)
    const [userData] = useDocumentData(doc);
    props.onSetState(userData)

    const addCup = () => {
        if (props.cups >= 5) return;

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

    return(
        <div className='user-extended'>
            <div>
                Unique id: {props.uid}
            </div>
            <div>
                Name: {props.fullName}
            </div>
            <div>
                Active cups: {props.cups}
            </div>
            <div>
                Free cups got: {props.freeCupsGot}
            </div>
            <button onClick={addCup} disabled={props.cups >= 5} className='cup-action'>Add cup</button>
            <button onClick={getFreeCup} disabled={props.cups !== 5} className='cup-action'>Get free cup</button>
        </div>

    )
}
function mapStateToProps(state) {
    return {
        cups: state.cups,
        freeCupsGot: state.freeCupsGot,
        uid: state.uid,
        photoURL: state.photoURL,
        fullName: state.fullName
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSetState: (newState) => dispatch(setState(newState))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminActionsOnUser)

