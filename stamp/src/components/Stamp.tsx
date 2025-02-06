'use client';
import html2canvas from "html2canvas";
import { useState, useRef, useEffect } from "react";
import { useInfoStore } from "@/stores/stampStore";

const Stamp = () => {
  const { stampType, stampLang, stampFont, stampName, setStampType, setStampLang, setStampFont, setStampName } = useInfoStore();
  console.log("나오는지 보면요", stampName);

  // 텍스트 변경 함수
  const handleNameChange = (newText: string) => {
    setStampName({ text: newText });
  };

  // 폰트 크기 변경 함수
  const handleFontSizeChange = (newSize: number) => {
    setStampName({ fontSize: newSize });
  };

  // 색상 변경 함수
  const handleColorChange = (newColor: string) => {
    setStampName({ color: newColor });
  };

  // SVG 파일 다운로드 함수
  const downloadSVG = () => {
    const svgElement = document.getElementById("seal-svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "seal.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        id="seal-svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 원형 테두리 */}
        <circle cx="100" cy="100" r="90" stroke="red" strokeWidth="5" fill="none" />
        <circle cx="100" cy="100" r="50" stroke="red" strokeWidth="3" fill="none" />
        {/* 원형 경로 (텍스트를 따라갈 길) */}
        <defs>
          <path id="circlePath" d="M 100,10 A 90,90 0 1,1 99.9,10" fill="none" />
        </defs>

        <text fill="red" fontSize="30" fontFamily="serif" dominantBaseline="hanging">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle" textLength="420" spacing="preserve" dy="10">
            {stampName}
          </textPath>
        </text>
        <text
          x="100"
          y="40"
          fontSize="30"
          fontWeight="bold"
          textAnchor="middle"
          fill="red"
          fontFamily="serif"
        >★
        </text>
        <text
          className="w-[20px]"
          x="100"
          y="110"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fill="red"
          fontFamily="serif"
        >
          {stampName}
        </text>
      </svg>


      {/* 다운로드 버튼 */}
      <button
        onClick={downloadSVG}
        className="mt-4 mb-[10px] px-4 bg-red-500 text-white "
      >
        도장 다운로드 (SVG)
      </button>
    </div>
  )
}

export default Stamp;