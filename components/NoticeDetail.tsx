import React from 'react';
import { NoticeProps } from '@/types';
import CustomButton from './CustomButton';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils';
import DOMPurify from "isomorphic-dompurify"

interface Props {
    postData: NoticeProps | null;
}

const NoticeDetail = ({ postData }: Props) => {
    const router = useRouter();
    const id = postData?.id;

    const formattedDate = postData ? formatDate(postData.createdAt) : "";

    // 글 삭제하기
    const handleDelete = async () => {
        if (id && window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    router.push('/');
                } else {
                    console.error('삭제 되지 않았습니다.');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className='max-width'>
            <p className='notice__subtitle'>공지사항</p>
            <h1 className='notice-detail__title'>{postData?.title}</h1>
            <p className='notice-detail__date'>{formattedDate}</p>
            <hr />
            <div className='py-[32px]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postData?.desc || '') }} />
            <hr />
            <div className='notice-detail__button'>
                <Link href='/'>
                    <CustomButton title="목록으로" containerStyles={"border "} />
                </Link>
                <CustomButton title="수정" containerStyles={"bg-[#FF5C00]"} textStyles={"text-white"} />
                <CustomButton title="삭제" containerStyles={"bg-[#FF0000]"} textStyles={"text-white"} handleClick={handleDelete} />
            </div>
        </div>
    );
}

export default NoticeDetail;
