'use client';
import React, { useState } from 'react'
import MyCommute from './MyCommute';
import MyWorkTime from './MyWorkTime';
import MyElecPayment from './MyElecPayment';
import MyLeave from './MyLeave';

function PageDash() {
    return (
        <>
            <div className='flex grid grid-flow-row grid-cols-3'>
                <MyCommute />
                <div className='flex flex-col'>
                    <MyWorkTime />
                    <MyElecPayment />
                </div>
                <div className='flex flex-col'>
                    <MyLeave />
                </div>
            </div>
        </>
    )
}

export default PageDash
