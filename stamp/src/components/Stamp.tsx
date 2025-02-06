'use client';
import html2canvas from "html2canvas";
import { useRef, useEffect } from "react";


const Stamp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // 배경 투명 설정
    ctx.clearRect(0, 0, size, size);

    // 원형 테두리 그리기
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
    ctx.stroke();

    // 텍스트 추가
    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("홍길동", size / 2, size / 2);
  }, []);

  return <canvas ref={canvasRef} style={{ background: "transparent" }} />;
}

export default Stamp;