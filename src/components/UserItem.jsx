import React from 'react';
import './UserItem.css';

function UserItem(props) {
    const {name, email, isGoldClient, wage, src } = props;

    return (
        <div className="user-item">
            <h3>{ name }</h3>
            <p>{ email }</p>
            <p>{wage}</p>
            <img className="image" src={"https://image.freepik.com/free-vector/business-people-organization-office-freelance-job-character_40876-1291.jpg"} alt="people" />
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <button>Sterge user</button>
        </div>
    );
}

export default UserItem;