import React, { useState, useContext } from 'react';
import Image from 'next/image';

// Internal Imports

import styles from './Friend.module.css';
import images from '../../assets';
import Card from './Card/Card';
import Chat from './Chat/Chat';
import { ChatAppContext } from '../../Context/ChatAppContext';

const Friend = () => {

    const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
} = useContext(ChatAppContext);

console.log(friendLists);

return (
    <div className={styles.friend}>
        <div className={styles.friend_box}>
            <div className={styles.friend_box_left}>
                {friendLists.map((friend, index) => (
                    <Card 
                        key={index + 1}
                        friend={friend}
                        index={index}
                        readMessage={readMessage}
                        readUser={readUser}
                    />
                ))}
            </div>
            <div className={styles.friend_box_right}>
                <Chat
                    functionName={sendMessage}
                    readMessage={readMessage}
                    friendMsg={friendMsg}
                    account={account}
                    userName={userName}
                    loading={loading}
                    currentUserName={currentUserName}
                    currentUserAddress={currentUserAddress}
                    readUser={readUser}
                />
            </div>
        </div>
    </div>
);
};

export default Friend;
