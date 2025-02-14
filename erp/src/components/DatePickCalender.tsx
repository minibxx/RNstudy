"use client"
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
import { useCalendarStore } from '@/stores/DatePickCalendarStore';

const DaysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarContainer = styled.div`
  width: 90%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2%;
`;

dayjs.extend(weekOfYear);
dayjs.extend(weekday);

function DatePickCalendar({ onChange }: { onChange: (value: string) => void }) {
  const { currentMonth, setCurrentMonth, startDate, endDate, selectDate, selectedDate } = useCalendarStore();

  let day: Dayjs = startDate.subtract(1, 'day'); // 시작 전날 설정
  const calendar: Dayjs[][] = [];

  while (day.isBefore(endDate, 'day')) {
    calendar.push(
      Array(7)
        .fill(null)
        .map(() => {
          day = day.add(1, 'day');
          return day;
        })
    );
  }

	const handleDateClick = (date: Dayjs) => {
    selectDate(date);
    const formattedDate = date.format('YYYY-MM-DD');
    onChange(formattedDate); // 부모로 선택된 날짜 전달
  };

  return (
    <CalendarContainer>
      <div className='flex justify-center w-[100%]'>
        <Image 
          alt="previous month" 
          src="/BIZ.png" 
          width={20} 
          height={20} 
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
          className="cursor-pointer"
        />
        <div>{currentMonth.format('MM월 YYYY')}</div>
        <Image 
          alt="next month" 
          src="/BIZ.png" 
          width={20} 
          height={20} 
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
          className="cursor-pointer"
        />
      </div>
      <CalendarDiv>
        {DaysOfWeek.map((day, index) => (
          <span 
            style={{ fontSize: '14px', padding: '8px', width: '5%', textAlign: 'center' }} 
            key={index}
          >
            {day}
          </span>
        ))}
      </CalendarDiv>
      <div>
        {calendar.map((week, weekIndex) => (
          <CalendarDiv key={weekIndex}>
            {week.map((date, dayIndex) => (
              <div 
                key={dayIndex} 
                style={{
                  fontSize: '14px', 
                  padding: '8px', 
                  width: '5%', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  backgroundColor: selectedDate?.isSame(date, 'day') ? '#cce4ff' : 'transparent',
                }}
                onClick={() => handleDateClick(date)} 
              >
                {date.format('D')}
              </div>
            ))}
          </CalendarDiv>
        ))}
      </div>
    </CalendarContainer>
  );
}

export default DatePickCalendar;
