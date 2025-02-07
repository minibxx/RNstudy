'use client';
import Image from "next/image";
import Stamp from '@/components/Stamp';
import { useState } from "react";
import { useInfoStore } from "@/stores/stampStore";

export default function Home() {
  const { stampLang, stampFont, stampName, setStampLang, setStampFont, setStampName } = useInfoStore();
  const [inputCompany, setInputCompany] = useState("");

  console.log(stampName);
  const saveName = () => {
    setStampName(inputCompany)
  }
  return (
    <>
      <div className="bg-[#F3F3F3] text-center py-[20px]">도장 만들기</div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">01 도장서체</div>
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
        <div className="mb-[20px]">02 비표</div>
        <div className="flex justify-start gap-[40px]">
          <div className="flex text-center">
            <input type="radio" id="normal" onChange={() => { setStampLang("●") }} checked={stampLang === "●"} />
            <p className="pl-[5px]">●</p>
          </div>
          <div className="flex text-center">
            <input type="radio" id="normal" onChange={() => { setStampLang("★") }} checked={stampLang === "★"} />
            <p className="pl-[5px]">★</p>
          </div>
          <div className="flex text-center">
            <input type="radio" id="normal" onChange={() => { setStampLang("▲") }} checked={stampLang === "▲"} />
            <p className="pl-[5px]">▲</p>
          </div>
          <div className="flex text-center">
            <input type="radio" id="normal" onChange={() => { setStampLang("◆") }} checked={stampLang === "◆"} />
            <p className="pl-[5px]">◆</p>
          </div>
        </div>
      </div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">03 이름</div>
        <div className="flex justify-start gap-[10px] mb-[20px]">
          {/* <input className="border-2" placeholder="대표이사 명을 입력하세요" value={inputName} onChange={(e) => { setInputName(e.target.value) }}></input> */}
          <input className="border-2" placeholder="회사 명을 입력하세요" value={inputCompany} onChange={(e) => { setInputCompany(e.target.value) }}></input>
          <button className="px-[10px] text-white bg-[gray]" onClick={saveName}>도장 생성하기</button>
        </div>
        <div>*선택하신 '언어'에 맞는 한글 또는 한자를 입력하세요.</div>
      </div>

      <Stamp />
    </>

  );
}
