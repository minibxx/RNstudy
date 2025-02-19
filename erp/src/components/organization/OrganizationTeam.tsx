"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarContainer = styled.div`
  width: 45vw;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 10px;
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

const InputStyle = styled.div`
  width: 240px;
  border: 1px solid #e0e0e0;
  padding: 8px;
  border-radius: 6px;
  display: flex;
`;

interface Member {
  a: string;  // 이름
  b: string;  // 직위
  c: string;  // 부서
  d: string;  // 업무
  e: string;  // 사번
  f: string;  // 회사명
  g: string;  // 연락처
  h: string;  // 이메일
  i: string;  // 사용자 유형
  z: string;  // 프로필 이미지 경로
}

const Modal: React.FC<{ member: Member | null; onClose: () => void }> = ({ member, onClose }) => {
  return (
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-96"
          >
            <h2 className="text-xl font-semibold mb-4">{member.a}</h2>
            <p className="text-gray-600">{member.b} ({member.c})</p>
            <p className="text-gray-600">{member.d}</p>
            <p className="text-gray-600">{member.g} / {member.h}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function OrganizationTeam() {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const teamName = "솔루션기획팀";
  
  const members: Member[] = [
    { a: '홍길동', b: '책임', c: '솔루션기획팀', d: '기획하깅', e: '2025161', f: '비즈비', g: '010-1234-1234', h: 'hi@gmail.com', i: '내부사용자', z: '/BIZ.png' },
    { a: '민유빈', b: '주임', c: '솔루션기획팀', d: '기획관리', e: '2025001', f: '비즈비', g: '010-1234-1234', h: 'yes@gmail.com', i: '내부사용자', z: '/BIZ.png'  },
    { a: '멍충이', b: '사원', c: '디자인팀', d: 'UI/UX 디자인', e: '2025999', f: '비즈비', g: '010-1234-1234', h: 'bye@gmail.com', i: '내부사용자', z: '/BIZ.png' },
  ];
  
  // 검색 필터 적용
  const filteredMembers = members.filter(member =>
    Object.values(member).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return (
    <>
      <CalendarContainer>
        <h3>{teamName}</h3>
        <InputStyle>
          <input
            type="text"
            placeholder="이름, 직위를 입력해 주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Image alt="search icon" src="/BIZ.png" width={20} height={20} />
        </InputStyle>
        <TableContainer>
          <thead>
            <TableHeader>
              <TableCell></TableCell>
              <TableCell>이름</TableCell>
              <TableCell>직위</TableCell>
              <TableCell>부서</TableCell>
              <TableCell>업무</TableCell>
            </TableHeader>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => (
                <TableRow key={index} onClick={() => setSelectedMember(member)}>
                  <TableCell>
                    <Image alt="profile" src={member.z} width={20} height={20} />
                  </TableCell>
                  <TableCell>{member.a}</TableCell>
                  <TableCell>{member.b}</TableCell>
                  <TableCell>{member.c}</TableCell>
                  <TableCell>{member.d}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>검색 결과가 없습니다.</TableCell>
              </TableRow>
            )}
          </tbody>
        </TableContainer>
      </CalendarContainer>
      
      <Modal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}

export default OrganizationTeam;
