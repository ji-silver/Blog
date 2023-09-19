'use client'
import CustomButton from '@/components/CustomButton'
import NoticeWrite from '@/components/NoticeWrite'
import TextEditor from '@/components/TextEditor'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils'

interface paramsProps {
    params: {
        postId: string;
    };
}

const Editpage = ({ params }: paramsProps) => {
    const { postId } = params;
    const router = useRouter();
    const [date, setDate] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
    });


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


    // 불러오기
    useEffect(() => {
        const getPostId = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
                if (!res.ok) {
                    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
                }
                const data = await res.json();
                setFormData({
                    title: data.title,
                    desc: data.desc,
                });
                setDate(data.createdAt)
            } catch (err) {
                console.log(err);
            }
        };
        getPostId();
    }, [postId]);


    // 수정하기
    const handleEditSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                router.push(`/detail/${postId}`)
            } else {
                alert('수정하지 못했습니다. 잠시후에 다시 이용해주세요.');
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='max-width'>
            <NoticeWrite onTextChange={handleTitleChange} initialValue={formData.title} />
            <p className='text-[#707070] pt-[16px] pb-[32px]'>{formatDate(date)}</p>
            <TextEditor onTextChange={handleDescChange} value={formData.desc} />
            <div className='pt-[16px] mb-[60px]'>
                <CustomButton title="취소" containerStyles={"border border-[#DEDEDE] mr-[16px]"} handleClick={() => router.back()} />
                <CustomButton title="저장" containerStyles={"bg-[#FF5C00]"} textStyles={"text-white"} handleClick={handleEditSubmit} />
            </div>
        </div>
    )
}

export default Editpage
