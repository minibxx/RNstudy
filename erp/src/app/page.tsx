import DatePickCalendar from "@/components/DatePickCalender";
import GNB from "@/components/GNB";
import Organization from "@/components/Organization";
import PeriodPick from "@/components/PeriodPick";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Organization/>
      <GNB/>
      <PeriodPick/>
    </>
  )
}
