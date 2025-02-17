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

function DatePickMonth() {
	const [year, setYear] = useState<number>(2025);
	return (
		<CalendarContainer>
			<div className='flex justify-center w-[100%]'>
				<Image
					alt="previous month"
					src="/BIZ.png"
					width={20}
					height={20}
					onClick={() => setYear(year => year - 1)}
					className="cursor-pointer"
				/>
				<div>{year}</div>
				<Image
					alt="next month"
					src="/BIZ.png"
					width={20}
					height={20}
					onClick={() => setYear(year => year + 1)}
					className="cursor-pointer"
				/>
			</div>
			<div className='grid grid-flow-row grid-cols-3 text-center text-gray'>
				<span >1월</span>
				<span >2월</span>
				<span >3월</span>
				<span >4월</span>
				<span >5월</span>
				<span >6월</span>
				<span >7월</span>
				<span >8월</span>
				<span >9월</span>
				<span >10월</span>
				<span >11월</span>
				<span >12월</span>
			</div>
		</CalendarContainer>
	)
}

export default DatePickMonth
