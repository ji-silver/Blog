import React from 'react'
import styles from './loading.module.scss'

const loading = () => {
    return (
        <div className={styles.loading}>
            <img src="/loading.gif" alt="" />
        </div>
    )
}

export default loading
