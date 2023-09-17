'use client'
import CustomButton from '@/components/CustomButton'
import NoticeWrite from '@/components/NoticeWrite'
import TextEditor from '@/components/TextEditor'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation';

interface FormData {
    title: string;
    desc: string;
};

const WritePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        desc: '',
    })

    // 오늘날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    // 제목 업데이트
    const handleTitleChange = (text: string) => {
        setFormData((prevData) => ({
            ...prevData,
            title: text,
        }));
    };

    // 내용 업데이트
    const handleDescChange = (text: string) => {
        setFormData((prevData) => ({
            ...prevData,
            desc: text,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/posts/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                router.push(`/detail/${data.id}`)
            } else {
                alert('저장하지 못했습니다. 잠시후에 다시 이용해주세요.');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='max-width'>
            {/* 제목 컴포넌트 */}
            <NoticeWrite onTextChange={handleTitleChange} />

            <p className='text-[#707070] pt-[16px] pb-[32px]'>{formattedDate}</p>
            {/* 내용 컴포넌트 */}
            <TextEditor onTextChange={handleDescChange} value={formData.desc} />

            <div className='pt-[16px] mb-[60px]'>
                <CustomButton title="취소" containerStyles={"border border-[#DEDEDE] mr-[16px]"} handleClick={() => router.back()} />
                <CustomButton title="저장" containerStyles={"bg-[#FF5C00]"} textStyles={"text-white"} handleClick={handleSubmit} />
            </div>
        </div>
    )
}

export default WritePage
