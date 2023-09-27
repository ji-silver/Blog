'use client'
import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.scss'
import { HiPencilSquare, HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import CustomButton from '../customButton/CustomButton';
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'

const USER_IMAGE = "https://res.cloudinary.com/jisilver/image/upload/v1693725189/upload/wcystucfzjmot8dbqv3l.png"

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleButtonClick = () => {
        if (session) {
            if (window.confirm('로그아웃 하시겠습니까?')) {
                signOut({ callbackUrl: "/" });
            } else {
                return;
            }
        } else {
            router.push('/login')
        }
    }

    const handleCreatePost = () => {
        if (session) {
            router.push('/write')
        } else {
            router.push('/login')
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.wrap}>
                <div className={styles.navbarLeft}>
                    <Link href='/'>
                        <h1>Blog</h1>
                    </Link>
                </div>
                <div className={styles.navbarRight}>
                    <CustomButton icon title="작성하기" containerStyles={styles.writeBtn} textStyles={styles.writeTitle} handleClick={handleCreatePost}><HiPencilSquare /></CustomButton>
                    <CustomButton icon title={session ? "로그아웃" : "로그인"} containerStyles={styles.loginBtn} textStyles={styles.loginTitle} handleClick={handleButtonClick}><HiOutlineArrowLeftOnRectangle /></CustomButton>
                    <div className={styles.user}>
                        <Image src={session?.user?.image || USER_IMAGE} width={40} height={40} alt="user image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
