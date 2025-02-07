'use client';
import html2canvas from "html2canvas";
import { useState, useRef, useEffect } from "react";
import { useInfoStore } from "@/stores/stampStore";

const Stamp = () => {
  const { stampType, stampLang, stampFont, stampName, setStampType, setStampLang, setStampFont, setStampName } = useInfoStore();
  console.log("나오는지 보면요", stampName);

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
        
        <circle cx="100" cy="100" r="50" stroke="red" strokeWidth="3" fill="none"  />
        {/* 원형 경로 (텍스트를 따라갈 길) */}
        <defs>
          <path id="circlePath" d="M 100,16 A 84,84 0 1,1 99.9,16" fill="none" /> {/* 반지름 84 */}
        </defs>

        <text fill="red" fontSize="30" fontFamily="HJB" dominantBaseline="hanging" style={{ fontFamily: 'HJB' }}>
          <textPath
            href="#circlePath"
            startOffset="50%"
            textAnchor="middle"
            textLength="527.7875658030853" //  반지름 84인 원의 둘레
            spacing="preserve"
            dy="10"
            // style={{ letterSpacing }}
          >
            &nbsp;{stampName}&nbsp;
            
          </textPath>
        </text>
        <text
          x="100"
          y="42"
          fontSize="30"
          fontWeight="bold"
          textAnchor="middle"
          fill="red"
          fontFamily="serif"
        >{stampLang}
        </text>
        <text
          className="w-[20px]"
          x="100"
          y="95"
          fontSize="38"
          fontWeight="bold"
          textAnchor="middle"
          fill="red"
          fontFamily="serif"
        >
          理代
        </text><text
          className="w-[20px]"
          x="100"
          y="130"
          fontSize="38"
          fontWeight="bold"
          textAnchor="middle"
          fill="red"
          fontFamily="serif"
        >
          事表
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