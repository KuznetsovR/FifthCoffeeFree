import React, {useState} from "react";
import firebase from "firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import AdminActionsOnUser from "../AdminActionsOnUser/AdminActionsOnUser";
import './UserList.css'

const firestore = firebase.firestore();


function UserList() {
    const usersRef = firestore.collection('users')
    const query = usersRef.orderBy('createdAt').limit(100)
    const [usersCollection] = useCollectionData(query, {idField: 'uid'})
    const [currentUser, setCurrentUser] = useState(null);
    return(
        <div className='user-list'>
            {usersCollection
                ?
                currentUser?
                    <>
                        <button onClick={() => setCurrentUser(null)} className='go-back-btn'>Go back</button>
                        <AdminActionsOnUser user={currentUser}/>
                    </>
                    :
                    <ul>
                        {usersCollection.map((el, index) => {
                            return (
                                <li key={index} onClick={() => setCurrentUser(el)} className='user'>
                                    {el.fullName || el.email}
                                </li>
                            )
                        })}
                    </ul>
                : 'Loading...'
            }
        </div>
    )
}

export default UserList
