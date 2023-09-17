import CustomButton from '@/components/CustomButton'
import NoticeWrite from '@/components/NoticeWrite'
import TextEditor from '@/components/TextEditor'
import React from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    return (
        <div className='max-width'>
            <NoticeWrite />
            <TextEditor />
            <div className='pt-[16px] mb-[60px]'>
                <CustomButton title="취소" containerStyles={"border border-[#DEDEDE] mr-[16px]"} handleClick={() => router.back()} />
                <CustomButton title="저장" containerStyles={"bg-[#FF5C00]"} textStyles={"text-white"} />
            </div>
        </div>
    )
}

export default page
