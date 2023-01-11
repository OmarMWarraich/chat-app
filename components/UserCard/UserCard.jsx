import React from 'react';
import Image from 'next/image';

// Internal Import
import styles from "./UserCard.module.css";
import images from "../../assets";

const UserCard = ({ user, index, addFriends }) => {
  console.log(user)
  return (
    <div className={styles.UserCard}>
      <div className={styles.UserCard_box}>
        <Image 
          src={images[`image${index+1}`]} 
          alt="user" 
          width={100} 
          height={100}
          className={styles.UserCard_box_image} 
        />
        <div className={styles.UserCard_box_info}>
          <h3>{user.name}</h3>
          <p>{user.accountAddress.slice(0,25)}..</p>
          <button
            onClick={() => addFriends({account: user.accountAddress, name: user.name })}
            className={styles.UserCard_box_info_button}
          >
            Add Friend
            </button>
        </div>
      </div>

      <small className={styles.number}>{index + 1}</small>
    </div>
  )
}

export default UserCard