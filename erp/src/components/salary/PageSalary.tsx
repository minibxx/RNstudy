"use client"
import React from 'react'
import PeriodPick from '../calendar/PeriodPick'
import Salary from './Salary'

function PageSalary() {
    return (
        <>
            <div className='flex justify-between'>
                <div>급여정보</div>
                <div className="flex">
                    <div>이번달</div>
                    <PeriodPick />
                    <span className="mx-[10px]">~</span>
                    <PeriodPick />
                </div>
            </div>
            <Salary/>
        </>
    )
}

export default PageSalary
