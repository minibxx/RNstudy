import Image from "next/image";
import Stamp from '@/components/Stamp';

export default function Home() {
  return (
    <>
      <div className="bg-[#F3F3F3] text-center py-[20px]">도장 만들기</div>

      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">01 도장종류</div>
        <div className="flex justify-start gap-[40px]">
          <div className="flex flex-col text-center">
            <input
              type="radio"
              value="normal"
              name="gameModeGroup"
              id="normal"
            // onChange={selectGameMode}
            // checked={gameMode == 'normal'}
            />
            <p>개인도장</p>
            <p>(원형)</p>
            <p>무료</p>
          </div>
          <div className="flex flex-col text-center">
            <input
              type="radio"
              value="normal"
              name="gameModeGroup"
              id="normal"
            />
            <p>개인도장</p>
            <p>(타원형)</p>
            <p>무료</p>
          </div>
        </div>
      </div>
      <div className="border-2 m-[20px] p-[20px]">
        <div className="mb-[20px]">01 이름</div>
        <div className="flex justify-start gap-[10px] mb-[20px]">
          <input className="border-2" placeholder="이름을 입력하세요"></input>
          <button className="px-[10px] text-white bg-[gray]">도장 생성하기</button>
        </div>
          <div>*선택하신 '언어'에 맞는 한글 또는 한자를 입력하세요.</div>            
      </div>
      
      <Stamp/>
      </>

  );
}
