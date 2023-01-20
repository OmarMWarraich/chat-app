import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Internal Imports
import styles from './Card.module.css';
import images from '../../../assets';

const Card = ({ readMessage, el, i, readUser }) => {
    console.log(el)
    return (
        <Link
            href={{
                pathname: '/',
                query: { name: `${el.name}`, address: `${el.pubkey}` },
            }}
        >
            <div className={styles.card}
            onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}
            >
                <div className={styles.card_box}>
                    <div className={styles.card_box_left}>
                        <Image
                            src={images.accountName}
                            alt="account name"
                            width={50}
                            height={50}
                            className={styles.card_box_left_img}
                        />
                    </div>
                    <div className={styles.card_box_right}>
                        <div className={styles.card_box_right_middle}>
                            <h4>{el.name}</h4>
                            <small>{el.pubkey.slice(21)}...</small>
                        </div>
                        <div className={styles.card_box_right_end}>
                            <small>{i + 1}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;