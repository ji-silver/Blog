'use client'
import dynamic from 'next/dynamic';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatTodayDate } from '@/utils';
import NoticeWrite from '../noticeWrite/NoticeWrite';
import CustomButton from '../customButton/CustomButton';
import { PostFormData } from '@/types';
import styles from './formPage.module.scss'
import { useImage } from '@/context/ImageContext';

// 에디터 SSR 지원 x, 비동기적으로 가져오기
const Editor = dynamic(() => import('../textEditor/TextEditor'), { ssr: false });

interface PostFormProps {
    onSubmit: (formData: PostFormData) => Promise<void>;
    initialFormData: PostFormData;
    titlePlaceholder: string;
}

const FormPage = ({
    onSubmit,
    initialFormData,
    titlePlaceholder,
}: PostFormProps) => {
    const router = useRouter();
    const { imageUrl } = useImage();
    const [formData, setFormData] = useState<PostFormData>(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const defaultImg = "https://jisilver-bucket.s3.ap-northeast-2.amazonaws.com/upload/noimage+(1).jpg"

    // 이미지 없을 때 기본 이미지 넣기
    useEffect(() => {
        const imgURL = imageUrl || defaultImg;

        setFormData(prevData => ({
            ...prevData,
            img: imgURL,
        }));
    }, [imageUrl]);


    const handleTitleChange = (text: string) => {
        setFormData((prevData) => ({
            ...prevData,
            title: text,
        }));
    };

    const handleDescChange = (text: string) => {
        setFormData((prevData) => ({
            ...prevData,
            desc: text,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.title || !formData.desc) {
                alert('빈칸을 모두 입력해주세요.');
                return;
            }
            await onSubmit(formData);
        } catch (err) {
            console.log(err);
            alert('저장하지 못했습니다. 잠시 후에 다시 시도해주세요.');
        }
    };

    return (
        <div className="max-width">
            <div className={styles.form}>
                <NoticeWrite
                    onTextChange={handleTitleChange}
                    placeholder={titlePlaceholder}
                    value={initialFormData.title}
                />

                <p className={styles.date}>
                    {formatTodayDate(new Date())}
                </p>

                <Editor
                    onTextChange={handleDescChange}
                    value={initialFormData.desc}
                />

                <div className={styles.btnContainer}>
                    <CustomButton
                        title="취소"
                        containerStyles={styles.cancelBtn}
                        handleClick={() => router.back()}
                    />
                    <CustomButton
                        title="저장"
                        containerStyles={styles.saveBtn}
                        handleClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormPage;
