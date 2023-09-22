'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import FormPage from '@/components/formPage/FormPage';
import { PostFormData } from '@/types';

const WritePage = () => {
    const router = useRouter();
    const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

    const handleWriteSubmit = async (formData: PostFormData) => {
        try {
            const res = await fetch('/api/posts/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                router.push(`/detail/${data.id}`);
            } else {
                alert('저장하지 못했습니다. 잠시후에 다시 이용해주세요.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <FormPage
            onSubmit={handleWriteSubmit}
            initialFormData={{ title: '', desc: '' }}
            titlePlaceholder="제목을 입력하세요"
        />
    );
};

export default WritePage;
