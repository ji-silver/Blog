'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import FormPage from '@/components/formPage/FormPage';
import { PostFormData } from '@/types';

const WritePage = () => {
    const router = useRouter();

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
                window.location.reload();

                // 페이지 이동
                const newUrl = `/detail/${data.id}`;
                window.location.href = newUrl;
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
