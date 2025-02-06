'use client';
import Image from "next/image";
import Stamp from '@/components/Stamp';
import { useState } from "react";
import { useInfoStore } from "@/stores/stampStore";

export default function Home() {
  const { stampType, stampLang, stampFont, stampName, setStampType, setStampLang, setStampFont, setStampName } = useInfoStore();
  const [inputName, setInputName] = useState("");

  console.log(stampType);
  console.log(stampLang);
  console.log(stampFont);
  console.log(stampName);
  const saveName = () => {
    setStampName(inputName)
  }
  return (
    <>
      <div className="bg-[#F3F3F3] text-center py-[20px]">도장 만들기</div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">01 도장종류</div>
        <div className="flex justify-start gap-[40px]">
          <div className="flex flex-col text-center">
            <input type="radio" id="normal" onChange={() => { setStampType(1) }} checked={stampType === 1} />
            <p>개인도장</p>
            <p>(원형)</p>
            <p>무료</p>
          </div>
          <div className="flex flex-col text-center">
            <input type="radio" id="normal" onChange={() => { setStampType(2) }} checked={stampType === 2}/>
            <p>개인도장</p>
            <p>(타원형)</p>
            <p>무료</p>
          </div>
        </div>
      </div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">02 언어종류</div>
        <div className="flex justify-start gap-[40px]">
          <div className="flex text-center">
          <input type="radio" id="normal" onChange={() => { setStampLang(true) }} checked={stampLang === true} />
            <p>한글</p>
          </div>
          <div className="flex text-center">
          <input type="radio" id="normal" onChange={() => { setStampLang(false) }} checked={stampLang === false} />
            <p>한자</p>
          </div>
        </div>
      </div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">03 도장서체</div>
        <div className="flex justify-start gap-[40px]">
          <div className="flex flex-col text-center">
          <input type="radio" id="normal" onChange={() => { setStampFont(1) }} checked={stampFont === 1} />
            <p>전서체체</p>
          </div>
          <div className="flex flex-col text-center">
          <input type="radio" onChange={() => { setStampFont(2) }} checked={stampFont === 2} />
            <p>인장체</p>
          </div>
        </div>
      </div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">01 이름</div>
        <div className="flex justify-start gap-[10px] mb-[20px]">
          <input className="border-2" placeholder="이름을 입력하세요" value={inputName} onChange={(e)=>{setInputName(e.target.value)}}></input>
          <button className="px-[10px] text-white bg-[gray]" onClick={saveName}>도장 생성하기</button>
        </div>
        <div>*선택하신 '언어'에 맞는 한글 또는 한자를 입력하세요.</div>
      </div>

      <Stamp />
    </>

  );
}
