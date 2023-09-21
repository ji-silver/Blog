'use client'
import { formatTime } from '@/utils';
import { NoticeProps } from '@/types'
import { useState } from 'react';
import PageNation from '../pageNation/PageNation';
import Link from 'next/link'
import styles from './noticeList.module.scss'
import Loading from '../loading/Loading';

interface NoticeListProps {
    data: NoticeProps[];
    loading: boolean
}

// 한 페이지 당 10개씩 보여주기 위해 변수 선언
const ITEMS_PER_PAGE = 10;

const NoticeList = ({ data, loading }: NoticeListProps) => {
    // 현재 페이지 관리하기
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지 변경 시 호출 (새로운 페이지 번호를 받아서 업데이트)
    const handlePage = (newPage: number) => {
        setCurrentPage(newPage)
    }

    // 받아온 data 길이를 10개씩 잘라서 전체 페이지 수 계산
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    // 시작과 끝 데이터 개수 정하기
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // 현재 페이지에서 보여줄 데이터를 startIndex부터 endIndex까지 잘라내기
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div>
            {loading ? (
                <div>
                    <Loading />
                    <hr />
                </div>
            ) : (
                <ul>
                    {currentPageData.length === 0 ? (
                        <div>
                            <p className={styles.empty}>공지사항이 없습니다.</p>
                            <hr />
                        </div>
                    ) : (
                        currentPageData.map((item) => (
                            <Link href={`/detail/${item.id}`} key={item.id}>
                                <div className={styles.list}>
                                    <p className={styles.title}>
                                        {item.title}
                                    </p>
                                    <p className={styles.time}>{formatTime(item.createdAt)}</p>
                                </div>
                            </Link>
                        ))
                    )}
                    <hr />
                </ul>
            )}
            {loading ? null : (
                <PageNation currentPage={currentPage} onPageChange={handlePage} totalPages={totalPages} />
            )}
        </div>
    )

}

export default NoticeList
