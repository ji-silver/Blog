'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import FormPage from '@/components/FormPage';

interface PostFormData {
    title: string;
    desc: string;
}

const WritePage = () => {
    const router = useRouter();

    const handleWriteSubmit = async (formData: PostFormData) => {
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
