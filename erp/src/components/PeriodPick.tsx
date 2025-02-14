"use client"
import React, { useState } from 'react'
import DatePickCalendar from './DatePickCalender'
import Image from 'next/image';
import styled from 'styled-components';
import { useCalendarStore } from '@/stores/DatePickCalendarStore';
import { useDatePickStore } from '@/stores/SalesManagementStore';

const CalendarContainer = styled.div`
  width: 90%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
`;
function PeriodPick() {
    const { startDate, endDate, selectDate } = useCalendarStore();
    const { startDatePick, setStartDatePick, endDatePick, setEndDatePick } = useDatePickStore();
    
    const [calendarOpen, setCalendarOpen] = useState(false);

    const clickCalendar1 = () => {
        setCalendarOpen(!calendarOpen); 
    }
    const clickCalendar2 = () => {
        setCalendarOpen(!calendarOpen); 
    }
    const handleDateClick1 = (value: string) => {
        setStartDatePick(value); 
        setCalendarOpen(false); 
      };
      const handleDateClick2 = (value: string) => {
        setEndDatePick(value); 
        setCalendarOpen(false); 
      };

      console.log('흠', startDate, '냐', endDate)
  return (
    <>
        <CalendarContainer onClick={()=>clickCalendar1()}>
            <span>{startDatePick || startDate.format("YY-MM-DD")}</span>
            <Image src="/BIZ.png" alt="hi" width={20} height={20}/>
        </CalendarContainer>
        { calendarOpen && <DatePickCalendar onChange={handleDateClick1}/>}

        <CalendarContainer onClick={()=>clickCalendar2()}>
            <span>{endDatePick || endDate.format("YY-MM-DD")}</span>
            <Image src="/BIZ.png" alt="hi" width={20} height={20}/>
        </CalendarContainer>
        { calendarOpen && <DatePickCalendar onChange={handleDateClick2}/>}
    </>
  )
}

export default PeriodPick
