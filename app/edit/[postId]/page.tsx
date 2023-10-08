'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormPage from '@/components/formPage/FormPage';
import { PostFormData } from '@/types';
import { useImage } from '@/context/ImageContext';

interface ParamsProps {
    params: {
        postId: string;
    };
}

const EditPage = ({ params }: ParamsProps) => {
    const { postId } = params;
    const router = useRouter();
    const { imageUrl } = useImage();
    const [date, setDate] = useState('');
    const [formData, setFormData] = useState<PostFormData | null>(null);

    const defaultImg = "https://jisilver-bucket.s3.ap-northeast-2.amazonaws.com/upload/noimage+(1).jpg";

    // 이미지
    useEffect(() => {
        const imgURL = imageUrl || defaultImg;
        setFormData((prevFormData: PostFormData | null) => ({
            ...prevFormData!,
            img: imgURL,
        }));
    }, [imageUrl]);


    useEffect(() => {
        const getPostId = async () => {
            try {
                const res = await fetch(`/api/posts/${postId}`);
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
            // 이미지 URL을 formData에 추가
            formData.img = imageUrl || defaultImg;

            console.log(formData); // formData 내용 확인

            const res = await fetch(`/api/posts/${postId}`, {
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