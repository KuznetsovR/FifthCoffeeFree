import React     from "react";
function AdminActionsOnUser(props){
    return(
        <div>
            <div>
                {props.user.uid}
            </div>
            <div>
                {props.user.fullName}
            </div>
        </div>

    )
}
export default AdminActionsOnUser
