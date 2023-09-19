'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';

interface NoticeWriteProps {
    initialValue?: string
    onTextChange: (text: string) => void;
}

const NoticeWrite = ({ onTextChange, initialValue }: NoticeWriteProps) => {
    const [value, setValue] = useState(initialValue || '');

    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setValue(newText);
        if (onTextChange) {
            onTextChange(newText);
        }
    };

    return (
        <div>
            <p className='notice__subtitle'>공지사항</p>
            <textarea
                value={value}
                onChange={handleChange}
                placeholder='제목을 입력해주세요.'
                className='border border-[#222222] w-full resize-none rounded-[6px] h-[150px] text-[32px] font-semibold px-[12px] py-[16px] mb-[16px]]'
            />
        </div>
    );
};

export default NoticeWrite;

