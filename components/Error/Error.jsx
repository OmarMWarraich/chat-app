import React from 'react';

// Internal Import

import styles from './Error.module.css';

const Error = ({error}) => {
  return (
    <div className={styles.Error}>
      <div className={styles.Error_box}>
        <h1>Please Fix This Error & Reload Browser.</h1>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Error