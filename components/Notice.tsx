'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NoticeList from './NoticeList'
import { NoticeProps } from '@/types'
import { useRouter } from 'next/navigation'

const Notice = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<NoticeProps[]>([])
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState<NoticeProps[]>([])
    const router = useRouter();

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
                const res = await fetch("http://localhost:3000/api/posts")

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
            <div className='notice__container'>
                <div className='notice__left'>
                    <h1 className='notice__title'>공지사항</h1>
                    <button className='notice__button' onClick={() => { router.push('/write') }}>작성하기</button>
                </div>
                <div className='notice__right'>
                    <input type="text" placeholder='검색어' className='notice__input' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className='notice__searchBtn' onClick={handleSearch}>
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
