import React from 'react'
import Image from 'next/image'
import NoticeList from './NoticeList'

const Notice = () => {
    return (
        <div className='max-width'>
            <div className='flex items-center justify-between pb-[20px]'>
                <h1 className='text-[32px] font-semibold flex'>공지사항</h1>
                <div className='relative flex w-[280px] h-[40px]'>
                    <input type="text" placeholder='검색어' className='border border-[#222222] rounded-[6px] w-full h-full px-3' />
                    <button className='w-[40px] h-full flex justify-center items-center absolute right-0'>
                        <Image src='/search.svg' alt="search button" width={24} height={24} />
                    </button>
                </div>
            </div>
            <hr />
            <NoticeList />
        </div>
    )
}

export default Notice
