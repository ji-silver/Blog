'use client'
import NoticeDetail from '@/components/NoticeDetail';
import React, { useEffect, useState } from 'react';

interface paramsProps {
    params: {
        postId: string;
    };
}

const FetchPage = ({ params }: paramsProps) => {
    const { postId } = params;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const getPostId = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}`);

                if (!res.ok) {
                    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
                }

                const data = await res.json();
                setPostData(data);
            } catch (err) {
                console.log(err);
            }
        };
        getPostId();
    }, [postId]);

    return (
        <>
            <NoticeDetail postData={postData} />
        </>
    );
};

export default FetchPage;
