"use client"
import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 45vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 10px;
`;

const TableContainer = styled.table`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
`;

const TableHeader = styled.tr`
  background-color: lightgray;
  font-weight: bold;
`;

const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
`;

const TableCell = styled.td`
//   border: 1px solid #e0e0e0;
  padding: 8px;
  text-align: center;
`;

function OrganizationTeam() {
  const [keyword, setKeyword] = useState('');
  const teamName = "솔루션기획팀";

  const members = [
    { a: '홍길동', b: '책임', c: '솔루션기획팀', d: '기획하깅' },
    { a: '김철수', b: '주임', c: '솔루션기획팀', d: '기획관리' },
    { a: '이영희', b: '사원', c: '디자인팀', d: 'UI/UX 디자인' }
  ];

  const filteredMembers = members.filter(member =>
    Object.values(member).some(value =>
      value.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return (
    <CalendarContainer>
      <h3>{teamName}</h3>
      <input
        type="text"
        placeholder="이름, 직위, 부서, 업무 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <TableContainer>
        <thead>
          <TableHeader>
            <TableCell>이름</TableCell>
            <TableCell>직위</TableCell>
            <TableCell>부서</TableCell>
            <TableCell>업무</TableCell>
          </TableHeader>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.a}</TableCell>
                <TableCell>{member.b}</TableCell>
                <TableCell>{member.c}</TableCell>
                <TableCell>{member.d}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>검색 결과가 없습니다.</TableCell>
            </TableRow>
          )}
        </tbody>
      </TableContainer>
    </CalendarContainer>
  );
}

export default OrganizationTeam;
