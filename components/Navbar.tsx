'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='text-white flex items-center gap-[77px]'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='logo' width={166} height={26}></Image>
                </Link>
                <Link href='/'>
                    <span>홈</span>
                </Link>
            </div>
            <ul className='flex gap-2 cursor-pointer text-white'>
                <Link href='/'>
                    <li className='px-3'>공지</li>
                </Link>
                <li className='px-3 navbar__point'>알림</li>
                <li className='px-3'>내 정보</li>
            </ul>
        </div>
    )
}

export default Navbar
