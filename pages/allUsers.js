import React, { useState, useEffect, useContext } from 'react';

// Internal Imports
import { UserCard } from '../components/index';
import styles from '../styles/allUsers.module.css';
import { ChatAppContext } from '../Context/ChatAppContext';

const allUsers = () => {
    const { userLists, addFriends } = useContext(ChatAppContext);
  return (
    <div>
        <div className={styles.allUsers_info}>
            <h1>Find your friends.</h1>
        </div>
        <div className={styles.allUsers}>
            {userLists.map((user, index) => (
                <UserCard key={index + 1} user={user} index={index} addFriends={addFriends} />
            ))}
        </div>
    </div>
  )
}

export default allUsers