import React, { useState, useContext } from 'react';
import Image from 'next/image';

// Internal Import
import styles from './Model.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Loader } from '../../components/index';

const Model = ({
  openBox,
  title,
  address,
  head, 
  info, 
  smallInfo, 
  image, 
  functionName,
}) => {

    // UseState
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    // UseContext
    const { loading } = useContext(ChatAppContext);

  return (
    <div className={styles.Model}>
      <div className={styles.Model_box}>
        <div className={styles.Model_box_left}>
          <Image 
            src={image} 
            alt="logo" 
            width={700} 
            height={700}
            className={styles.Model_box_left_image} 
          />
        </div>
        <div className={styles.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={styles.Model_box_right_name}>
            <div className={styles.Model_box_right_name_info}>
              <Image src={images.user_name} alt="user" width={30} height={30} />
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.Model_box_right_name_info}>
              <Image src={images.account} alt="user" width={30} height={30} />
              <input
                type="text"
                placeholder={address || "Enter your account address"}
                onChange={(e) => setAccountAddress(e.target.value)}
              />
            </div>
            <div className={styles.Model_box_right_name_btn}>
              <button onClick={() => functionName({name, accountAddress})}>
                {""}
                <Image src={images.send} alt="send" width={30} height={30} />
                {""}
                Submit
              </button>
              <button onClick={() => openBox(false)}>
                {""}
                <Image src={images.close} alt="send" width={30} height={30} />
                {""}
                Cancel
              </button>
            </div>
          </div>
          ) }
        </div>
      </div>
    </div>
  )
}

export default Model