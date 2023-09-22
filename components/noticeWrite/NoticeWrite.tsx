'use client'
import { NoticeTitleProps } from '@/types';
import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './noticeWrite.module.scss'

const NoticeWrite = ({ onTextChange, value: propValue }: NoticeTitleProps) => {
    const [value, setValue] = useState(propValue || '');

    useEffect(() => {
        setValue(propValue || '');
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.target.value;
        // 띄어쓰기 포함하여 100자로 제한
        if (newText.length > 100) {
            newText = newText.slice(0, 100);
        }
        setValue(newText);
        if (onTextChange) {
            onTextChange(newText);
        }
    };

    return (
        <div>
            <p className='noticeSubtitle'>공지사항</p>
            <textarea
                value={value}
                onChange={handleChange}
                placeholder='제목을 입력해주세요.'
                className={styles.title}
            />
        </div>
    );
};

export default NoticeWrite;