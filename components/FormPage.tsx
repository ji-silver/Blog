'use client'
import dynamic from 'next/dynamic';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatTodayDate } from '@/utils';
import NoticeWrite from './NoticeWrite';
import CustomButton from './CustomButton';

const Editor = dynamic(() => import('./TextEditor'), { ssr: false });

interface PostFormProps {
    onSubmit: (formData: PostFormData) => Promise<void>;
    initialFormData: PostFormData;
    titlePlaceholder: string;
}

interface PostFormData {
    title: string;
    desc: string;
}

const FormPage = ({
    onSubmit,
    initialFormData,
    titlePlaceholder,
}: PostFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState<PostFormData>(initialFormData);

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
            await onSubmit(formData);
        } catch (err) {
            console.log(err);
            alert('저장하지 못했습니다. 잠시 후에 다시 시도해주세요.');
        }
    };

    return (
        <div className="max-width">
            <NoticeWrite
                onTextChange={handleTitleChange}
                placeholder={titlePlaceholder}
                value={initialFormData.title}
            />

            <p className="text-[#707070] pt-[16px] pb-[32px]">
                {formatTodayDate(new Date())}
            </p>

            <Editor
                onTextChange={handleDescChange}
                value={initialFormData.desc}
            />

            <div className="pt-[16px] mb-[60px]">
                <CustomButton
                    title="취소"
                    containerStyles="border border-[#DEDEDE] mr-[16px]"
                    handleClick={() => router.back()}
                />
                <CustomButton
                    title="저장"
                    containerStyles="bg-[#FF5C00]"
                    textStyles="text-white"
                    handleClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default FormPage;
