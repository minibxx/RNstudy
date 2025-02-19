import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CommuteBtn = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? '#36BFFA' : '#EEF1F6')};
  color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;


const CommuteList = styled.button`
background-color : ${({theme}) => theme.mainPrimary}
  // >div{
  // backgroundcolor 
  // }
`;
function MyCommute() {
  const testData = [
    { a: "출근", b: "75" }, { a: "출근전", b: "16" }, { a: "미출근", b: "15" }, { a: "지각", b: "12" }
  ]
  const today = dayjs().format('YYYY.MM.DD ddd');
  const [time, setTime] = useState(dayjs());
  const [clickCheck, setClickCheck] = useState<boolean>(true);
  const [commuteTime, setCommuteTime] = useState<string | null>(null);

  const toggleCommute = (status: boolean) => {
    setClickCheck(status);
    setCommuteTime(dayjs().format('HH:mm:ss'))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-[10px]">
      <div>출퇴근</div>
      <div>{today}</div>
      <div>{time.format('HH:mm:ss')}</div>

      <div>
        <CommuteBtn isActive={clickCheck} onClick={() => toggleCommute(true)}>
          출근하기
        </CommuteBtn>
        <CommuteBtn isActive={!clickCheck} onClick={() => toggleCommute(false)}>
          퇴근하기
        </CommuteBtn>
      </div>
      <p>
        클릭시간: {commuteTime}
      </p>
      <select>
        <option>근무</option>
      </select>

      <div>출퇴근 현황</div>
      <div className="flex justify-between">
        <p>전체 직원</p>
        <p>118</p>
      </div>
        <div></div>
      <CommuteList className='grid grid-cols-2'>
        {
          testData.map((k, i) => (
            <div className="flex justify-between" key={i}>
              <p>{k.a}</p>
              <p>{k.b}</p>
            </div>
          ))
        }
      </CommuteList>
    </div>
  );
}

export default MyCommute;
