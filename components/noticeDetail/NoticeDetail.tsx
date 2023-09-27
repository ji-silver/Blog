import React from 'react';
import { NoticeProps } from '@/types';
import CustomButton from '../customButton/CustomButton';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils';
import DOMPurify from "isomorphic-dompurify"
import styles from './noticeDetail.module.scss'

interface Props {
    postData: NoticeProps | null;
}

const NoticeDetail = ({ postData }: Props) => {
    const router = useRouter();
    const id = postData?.id;
    const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';
    const formattedDate = postData ? formatDate(new Date(postData.createdAt)) : "";


    // 글 삭제하기
    const handleDelete = async () => {
        if (id && window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const res = await fetch(`/api/posts/${id}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    router.push('/');
                } else {
                    console.error('삭제되지 않았습니다.');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className='max-width'>
            <div className={styles.detail}>
                <h1 className={styles.title}>{postData?.title}</h1>
                <p className={styles.date}>{formattedDate}</p>
                <hr />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postData?.desc || '') }} />
                <hr />
                <div className={styles.btnContainer}>
                    <Link href='/'>
                        <CustomButton title="목록으로" containerStyles={styles.listBtn} />
                    </Link>
                    <CustomButton title="수정" containerStyles={styles.editBtn} handleClick={() => router.push(`/edit/${id}`)} />
                    <CustomButton title="삭제" containerStyles={styles.deleteBtn} handleClick={handleDelete} />
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;
