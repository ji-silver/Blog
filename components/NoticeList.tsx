import React from 'react'
import Link from 'next/link'
import { list } from '../app/utils'

const NoticeList = () => {
    return (
        <div>
            <ul className=''>
                {list.length > 0 ? (
                    list.map((link) => (
                        <div className='px-6 py-4 cursor-pointer hover:bg-[#EFF0f3]' key={link.id}>
                            <p className='text-[#222222]'>
                                {link.title}
                            </p>
                            <p className='text-[#707070] text-[14px]'>{link.time}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <p className='py-[74.5px] text-center text-[#707070]'>공지사항이 없습니다.</p>
                        <hr />
                    </div>
                )}
            </ul>
            <hr />
        </div>
    )
}

export default NoticeList
