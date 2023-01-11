import React, { useState, useContext } from 'react';
import Image from 'next/image';

// Internal Import
import styles from './Filter.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model } from '../index';

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  // const {} = useContext(ChatAppContext);

  // UseState
  const [ addFriend, setAddFriend ] = useState(false);

  return (
    <div className={styles.Filter}>
      <div className={styles.Filter_box}>
        <div className={styles.Filter_box_left}>
          <div className={styles.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20} />
            <input type="text" placeholder="Search.." />
          </div>
        </div>
        <div className={styles.Filter_box_right}>
          <button>
            <Image src={images.del} alt="filter" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.create2} alt="filter" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* Model Component   */}
      {addFriend && (
        <div className={styles.Filter_model}>
          <Model openBox={setAddFriend}
            title = "WELCOME TO"
            head = "CHAIN MESSENGER"
            info = "Chain Messenger is a decentralized messaging application (dapp) built on the Ethereum blockchain that allows users to send messages to each other without the need for a centralized server. The messages are stored on the blockchain and can be accessed by anyone with the address of the sender and receiver. The dApp is built using the Ethereum blockchain, Solidity, and Next/React."
            smallInfo="Kindly Select your friend name and address..."
            image={images.hero}
            functionName={addFriends}
          />
          </div>
      )}
      </div>
  );
};

export default Filter;