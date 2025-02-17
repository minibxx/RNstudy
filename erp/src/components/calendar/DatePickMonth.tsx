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

const MonthDiv = styled.div<{ selected: boolean }>`
   text-wrap: wrap;
   width: 60px;
  border-radius: 4px;
  object-fit: fill;
  margin: 0 auto;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#0A7EF7" : "transparent")};
  color: ${({ selected }) => (selected ? "#FFF" : "#000")};
`;

function DatePickMonth() {
	const months = ['1', "2","3","4","5","6","7","8","9","10","11","12"]
	const [year, setYear] = useState<number>(2025);
	const [selectedMonth, setSelectedMonth] = useState("12");
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
				{months.map((k,i)=>(
					<MonthDiv 
						selected={k === selectedMonth}
						onClick={()=>setSelectedMonth(k)}
						key={i}
					>
						{k}월
					</MonthDiv>
				))}
			</div>
			<p>{year}{selectedMonth}</p>
		</CalendarContainer>
	)
}

export default DatePickMonth
