import React from 'react'
import styles from './loading.module.scss'

const loading = () => {
    return (
        <div className={styles.loading}>
            <span className={styles.dot1}></span>
            <span className={styles.dot2}></span>
            <span className={styles.dot3}></span>
        </div>
    )
}

export default loading
