"use client"
import React, { useState } from 'react'
import DatePickCalendar from './DatePickCalender'
import Image from 'next/image';
import styled from 'styled-components';
import { useCalendarStore } from '@/stores/DatePickCalendarStore';

const CalendarContainer = styled.div`
  width: 90%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
`;
function PeriodPick() {
    const { startDate } = useCalendarStore();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [datePick, setDatePick] = useState("");

    const clickCalendar = () => {
        setCalendarOpen(!calendarOpen); 
    }
    const handleDateClick = (value: string) => {
        setDatePick(value); 
        setCalendarOpen(false); 
      };
  return (
    <>
        <CalendarContainer onClick={()=>clickCalendar()}>
            <span>{datePick || startDate.format("YY-MM-DD")}</span>
            <Image src="/BIZ.png" alt="hi" width={20} height={20}/>
        </CalendarContainer>
        { calendarOpen && <DatePickCalendar onChange={handleDateClick}/>}
    </>
  )
}

export default PeriodPick
