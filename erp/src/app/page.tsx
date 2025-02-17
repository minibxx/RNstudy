import DatePickCalendar from "@/components/calendar/DatePickCalender";
import DatePickMonth from "@/components/calendar/DatePickMonth";
import DatePickYear from "@/components/calendar/DatePickYear";
import GNB from "@/components/GNB";
import Organization from "@/components/organization/Organization";
import PeriodPick from "@/components/calendar/PeriodPick";
import UploadFile from "@/components/UploadFile";
import Image from "next/image";
import PageOrganization from "@/components/organization/PageOrganization";

export default function Home() {
  return (
    <>
      <PageOrganization/>
      <GNB />
      <div className="flex">
        <PeriodPick />
        <span className="mx-[10px]">~</span>
        <PeriodPick />
      </div>
      <DatePickMonth/>
      <DatePickYear/>
      <UploadFile/>
    </>
  )
}
