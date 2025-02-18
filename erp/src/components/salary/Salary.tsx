"use client"
import React, { useState } from 'react'
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 45vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;
const TableContainer = styled.table`
  width: 100%;
  border-spacing: 0px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeader = styled.tr`
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-top: 1px solid #e0e0e0;
  cursor: pointer;
  // &:nth-child(even) {
  //     background-color: #f9f9f9;
  //   }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: start;
`;
const SalaryContainer = styled.div`
  width: 45vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 16px;
`;

const SalaryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  position: relative; // 툴팁 absolute를 위해 필요!
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  left: 20px;
  top: -10px;
  background: #444;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const HelpIcon = styled.span`
  background: #e0e0e0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-left: 6px;
  cursor: pointer;
  position: relative;
  color: white;
`;

function Salary() {
    const [tooltip, setTooltip] = useState<number | null>(null);

    const salaryData = [
        { name: "기본급", amount: "4,500,000원" },
        { name: "연장수당", amount: "100,000원", tooltip: "연장(휴일)근로시간 * 통상임금(시급) * 150%" },
        { name: "야간수당", amount: "100,000원", tooltip: "야근근로시간 * 통상임금(시급) * 50%" },
        { name: "식대", amount: "100,000원" },
        { name: "성과급", amount: "150,000원" },
        { name: "차량유지비", amount: "50,000원" },
    ];
    return (
        <>
            <div>
                2025년 1월
            </div>
            <TableContainer>
                <thead>
                    <TableHeader>
                        <TableCell>급여산정기간</TableCell>
                        <TableCell>급여지급일자</TableCell>
                        <TableCell>급여지급계좌</TableCell>
                    </TableHeader>
                </thead>
                <tbody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </tbody>
            </TableContainer>
            <TableContainer>
                <thead>
                    <TableHeader>
                        <TableCell>근무일수</TableCell>
                        <TableCell>총근무시간</TableCell>
                        <TableCell>정상근로시간</TableCell>
                        <TableCell>연장근로시간</TableCell>
                        <TableCell>야간근무시간</TableCell>
                        <TableCell>휴일근무시간</TableCell>

                    </TableHeader>
                </thead>
                <tbody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </tbody>
            </TableContainer>
            <SalaryContainer>
                <h3>지급내역 <strong>5,000,000원</strong></h3>
                {salaryData.map((item, index) => (
                    <SalaryItem key={index}>
                        <div className='flex items-center'
                            onMouseEnter={() => setTooltip(index)}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <p className='bg-[lightblue] w-[10px] h-[10px] rounded-[50px] mr-[10px]' /> {item.name}
                            {item.tooltip && (
                                <HelpIcon>!
                                    <Tooltip show={tooltip === index}>{item.tooltip}</Tooltip>
                                </HelpIcon>
                            )}
                        </div>
                        <div>{item.amount}</div>
                    </SalaryItem>
                ))}
            </SalaryContainer>

        </>
    )
}

export default Salary
