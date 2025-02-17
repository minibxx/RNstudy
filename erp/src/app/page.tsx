import DatePickCalendar from "@/components/DatePickCalender";
import DatePickMonth from "@/components/DatePickMonth";
import GNB from "@/components/GNB";
import Organization from "@/components/Organization";
import PeriodPick from "@/components/PeriodPick";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Organization />
      <GNB />
      <div className="flex">
        <PeriodPick />
        <span className="mx-[10px]">~</span>
        <PeriodPick />
      </div>
      <DatePickMonth/>
    </>
  )
}
