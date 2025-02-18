"use client"
import React, { useState } from 'react'
import DatePickCalendar from './DatePickCalender'
import Image from 'next/image';
import styled from 'styled-components';
import { useCalendarStore } from '@/stores/DatePickCalendarStore';
// import { useDatePickStore } from '@/stores/SalesManagementStore';

const CalendarContainer = styled.div`
  width: 15vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
`;

function PeriodPick() {
  const { startDate, endDate, selectDate } = useCalendarStore();
  // const { startDatePick, setStartDatePick, endDatePick, setEndDatePick } = useDatePickStore();
  const [pickValue, setPickValue] = useState<string>('');

  const [calendarOpen, setCalendarOpen] = useState(false);

  const clickCalendar = () => {
    setCalendarOpen(!calendarOpen);
  }

  const handleDateClick = (value: string) => {
    setPickValue(value);
    setCalendarOpen(false);
  };

  return (
    <div className='flex flex-col relative'>
      <CalendarContainer onClick={() => clickCalendar()}>
        <span>{pickValue || startDate.format("YY-MM-DD")}</span>
        <Image src="/BIZ.png" alt="hi" width={20} height={20} />
      </CalendarContainer>
      {calendarOpen &&
          <DatePickCalendar onChange={handleDateClick} />}
    </div>
      
      )
}

export default PeriodPick
