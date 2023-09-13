import React from 'react'

const Notice = () => {
    return (
        <div className='max-width'>
            <div className='flex items-center'>
                <h1 className='text-[32px] font-semibold pb-[20px]'>공지사항</h1>
                <input type="text" className='border' />
            </div>
            <hr />
        </div>
    )
}

export default Notice
