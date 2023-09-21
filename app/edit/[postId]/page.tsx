'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormPage from '@/components/FormPage';

interface ParamsProps {
    params: {
        postId: string;
    };
}

interface PostFormData {
    title: string;
    desc: string;
}

const EditPage = ({ params }: ParamsProps) => {
    const { postId } = params;
    const router = useRouter();
    const [date, setDate] = useState('');
    const [formData, setFormData] = useState<PostFormData | null>(null);

    useEffect(() => {
        const getPostId = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
                if (!res.ok) {
                    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
                }
                const data = await res.json();
                setFormData(data);
                setDate(data.createdAt);
            } catch (err) {
                console.log(err);
            }
        };
        getPostId();
    }, [postId]);

    const handleEditSubmit = async (formData: PostFormData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                router.push(`/detail/${postId}`);
            } else {
                alert('수정하지 못했습니다. 잠시후에 다시 이용해주세요.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (formData === null) {
        return null;
    }

    return (
        <FormPage
            onSubmit={handleEditSubmit}
            initialFormData={formData}
            titlePlaceholder="제목을 입력하세요"
        />
    );
};

export default EditPage;