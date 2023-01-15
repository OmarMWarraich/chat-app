import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Internal Imports
import styles from './Card.module.css';
import images from '../../assets/images';
import { convertTime } from '../../utils/apiFeature';
import { Loader } from '../../index';

const Chat = ({
    functionName,
    readMessage,
    friendMsg,
    account,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
}) => {
    // UseState
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState({
        name: "",
        address: "",
    });

    const router = useRouter();

    // UseEffect
    useEffect(() => {
        if (!router.isReady) return;
        setChatData(router.query);
    }, [router.isReady]);

    useEffect(() => {
        if (chatData.address) {
            readMessage(chatData.address);
            readUser(chatData.address);
        }
    }, []);

    return (
        <div className={styles.chat}>
            {currentUserName && currentUserAddress ? (
                <div className={styles.chat_user_info}>
                    <Image src={images.accountName} alt="image" width={70} height={70} />
                    <div className={styles.chat_user_info_box}>
                        <h4>{currentUserName}</h4>
                        <p className={styles.show}>{currentUserAddress}</p>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className={styles.chat_box_box}>
                <div className={styles.chat_box}>
                    <div className={styles.chat_box_left}>
                        {friendMsg.map((item, index) => (
                                <div>
                                    {item.sender === chatData.address ? (
                                        <div className={styles.chat_box_left_title}>
                                            <Image
                                                src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50}
                                            />
                                            <span>
                                                {chatData.name} {""}
                                                <small>Time: {convertTime(item.timestamp)}</small>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className={styles.chat_box_left_title}>
                                            <Image
                                                src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50}
                                            />
                                            <span>
                                                {userName} {""}
                                                <small>Time: {convertTime(item.timestamp)}</small>
                                            </span>
                                        </div>
                                    )}
                                    <p key={index+1}>
                                        {item.msg}
                                        {""}
                                        {""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {currentUserName && currentUserAddress ? (
                        <div className={styles.chat_box_send}>
                            <div className={styles.chat_box_send_img}>
                                <Image
                                    src={images.smile}
                                    alt="smile"
                                    width={50}
                                    height={50}
                                />
                                <input
                                    type="text"
                                    placeholder="Type a message"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Image
                                    src={images.file}
                                    alt="file"
                                    width={50}
                                    height={50}
                                />
                                {loading == true ? (
                                    <Loader />
                                ) : (
                                    <Image
                                        src={images.send}
                                        alt="send"
                                        width={50}
                                        height={50}
                                        onClick={() =>
                                            functionName({ msg: message, address: chatData.address })}
                                    />
                                )}
                            </div>
                        </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
    );
};

export default Chat;