import React from 'react';
import Image from 'next/image'

interface PageNationProps {
    currentPage: number;
    onPageChange: (newPage: number) => void;
    totalPages: number;
}

const PageNation = ({ currentPage, onPageChange, totalPages }: PageNationProps) => {
    const handlePrevGroup = () => {
        const newPage = Math.max(currentPage - 5, 1);
        onPageChange(newPage);
    };

    const handleNextGroup = () => {
        const newPage = Math.min(currentPage + 5, totalPages);
        onPageChange(newPage);
    };

    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        onPageChange(newPage);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const numPagesInGroup = 5; // 한 그룹당 표시할 페이지 수
    const numGroups = Math.ceil(totalPages / numPagesInGroup);
    const currentGroup = Math.ceil(currentPage / numPagesInGroup);

    const startPage = (currentGroup - 1) * numPagesInGroup + 1;
    const endPage = Math.min(currentGroup * numPagesInGroup, totalPages);

    return (
        <div className="flex justify-center mt-4 mb-[64px] gap-4">
            <button
                onClick={handlePrevGroup}
                disabled={currentGroup === 1}
            >
                <Image src="/page_go_first.svg" alt="arrow button" width={20} height={20} />
            </button>
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                <Image src="/caretLeft.svg" alt="arrow button" width={20} height={20} />
            </button>
            <div className='flex gap-5'>
                {totalPages === 0 ? (
                    <button
                        onClick={() => onPageChange(1)} // 항상 1 페이지로 이동
                        className="font-bold"
                    >
                        1
                    </button>
                ) : (
                    Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`${page === currentPage ? "font-bold" : ""}`}
                        >
                            {page}
                        </button>
                    ))
                )}
            </div>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <Image src="/caretRight.svg" alt="arrow button" width={20} height={20} />
            </button>
            <button
                onClick={handleNextGroup}
                disabled={currentGroup === numGroups}
            >
                <Image src="/page_go_last.svg" alt="arrow button" width={20} height={20} />
            </button>
        </div>
    );
};

export default PageNation;
