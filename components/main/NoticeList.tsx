'use client'
import { formatTime } from '@/utils';
import PageNation from './PageNation';
import { NoticeProps } from '@/types'
import Link from 'next/link'

interface NoticeListProps {
    data: NoticeProps[];
    loading: boolean
}

const NoticeList = ({ data, loading }: NoticeListProps) => {
    return (
        <div>
            {loading ? (
                <div>
                    <p className='py-[74.5px] text-center'>로딩 중</p>
                </div>
            ) : (
                <ul>
                    {data.length === 0 ? (
                        <div>
                            <p className='py-[74.5px] text-center text-[#707070]'>공지사항이 없습니다.</p>
                            <hr />
                        </div>
                    ) : (
                        data.map((item) => (
                            <Link href={`/detail/${item.id}`} key={item.id}>
                                <div className='px-6 py-4 hover:bg-[#EFF0f3]'>
                                    <p className='text-[#222222]'>
                                        {item.title}
                                    </p>
                                    <p className='text-[#707070] text-[14px]'>{formatTime(item.createdAt)}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </ul>
            )}
            <hr />
            <PageNation />
        </div>
    )
}

export default NoticeList
