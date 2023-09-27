'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NoticeList from '../noticeList/NoticeList'
import { NoticeProps } from '@/types'
import { useRouter } from 'next/navigation'
import CustomButton from '../customButton/CustomButton'
import styles from './notice.module.scss';

const Notice = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<NoticeProps[]>([])
    const [filterData, setFilterData] = useState<NoticeProps[]>([])
    const [search, setSearch] = useState('')
    const router = useRouter();
    const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

    // 검색어 필터링
    const handleSearch = () => {
        const filteredData = data.filter((item) => {
            // 제목 또는 내용 기준으로 필터링한 데이터 넘기기
            return item.title.includes(search) || item.desc.includes(search);
        });
        setFilterData(filteredData);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('/api/posts/')

                if (!res.ok) {
                    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
                }
                const fetchData = await res.json();

                // 작성 시간 기준으로 최신순으로 정렬
                fetchData.sort((a: NoticeProps, b: NoticeProps) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setData(fetchData);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
        getData();
    }, []);

    return (
        <div className='max-width'>
            <div className={styles.notice}>
                <div className={styles.noticeLeft}>
                    <h1>모든 글</h1>

                </div>
                <div className={styles.noticeRight}>
                    <input type="text" placeholder='검색어' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={handleSearch}>
                        <Image src='/search.svg' alt="search button" width={24} height={24} />
                    </button>
                </div>
            </div>
            <hr />
            <NoticeList data={filterData.length > 0 ? filterData : data} loading={loading} />
        </div>
    )
}

export default Notice
