'use client'
import React from 'react'
import { useSession, signIn } from "next-auth/react"
import styles from './loginPage.module.scss'

const Login = () => {

    return (
        <div className={styles.login}>
            <div className={`max-width ${styles.wrap}`}>
                <div className={styles.title}>
                    <p>Welcome to my</p>
                    <h1>BLOG ✍🏼</h1></div>
                <div className={styles.social}>
                    <button className={styles.google} onClick={() => signIn("google", { callbackUrl: "/" })}>
                        <img src="/google.svg" alt="google" className={styles.googleImg} />구글 계정으로 로그인</button>
                    <button className={styles.kakao} onClick={() => signIn('kakao', { callbackUrl: "/" })} >
                        <img src="/kakao.svg" alt="kakao" className={styles.kakaoImg} />카카오 로그인</button>
                    <button className={styles.google} onClick={() => signIn('naver', { callbackUrl: "/" })} >네이버 로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Login
