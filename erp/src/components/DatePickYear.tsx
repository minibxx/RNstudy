"use client"
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useCalendarStore } from '@/stores/DatePickCalendarStore';

const CalendarContainer = styled.div`
  width: 45vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const CalendarDiv = styled.div`
  display: flex;
  
  justify-content: space-between;
  gap: 2%;
`;
const YearDiv = styled.div`
   text-wrap: wrap;
   width: 60px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  object-fit: fill;
  margin: 0 auto;
`;


const years = Array.from({ length: 100 }, (_, i) => 2025 - i);
const YEARS_PER_PAGE = 12;
function DatePickYear() {
    const [currentPage, setCurrentPage] = useState(0);

    // 2025부터 시작해서 필요한 만큼 줄어든 배열 생성
    const allYears = Array.from({ length: 60 }, (_, i) => 2025 - i); // 100년치 예제 (2025 ~ 1926)
  
    // 현재 페이지에 해당하는 연도만 표시
    const displayedYears = allYears.slice(
      currentPage * YEARS_PER_PAGE,
      (currentPage + 1) * YEARS_PER_PAGE
    )
    .reverse();
    console.log(displayedYears)
    return (
        <CalendarContainer>
            <div className='flex justify-center w-[100%]'>
                <Image
                    alt="previous month"
                    src="/BIZ.png"
                    width={20}
                    height={20}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={(currentPage + 1) * YEARS_PER_PAGE >= allYears.length}
                    className="cursor-pointer"
                    />
                {`${displayedYears[0]} - ${displayedYears[11]}`}
                <Image
                    alt="next month"
                    src="/BIZ.png"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0} 
                />
            </div>
            <div className='grid grid-flow-row grid-cols-3 text-center text-gray'>
                {displayedYears.map((year, index) => (
                    <YearDiv key={index}>{year}</YearDiv>
                ))}
            </div>
        </CalendarContainer>
    )
}

export default DatePickYear
