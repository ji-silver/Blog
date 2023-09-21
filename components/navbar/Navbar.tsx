'use client'
import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.scss'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link href='/'>
                    <img src='/logo.svg' alt='logo' width={166} height={26} />
                </Link>
                <Link href='/'>
                    <span>홈</span>
                </Link>
            </div>
            <ul>
                <Link href='/'>
                    <li>공지</li>
                </Link>
                <li className={styles.navbarPoint}>알림</li>
                <li>내 정보</li>
            </ul>
        </div>
    )
}

export default Navbar
