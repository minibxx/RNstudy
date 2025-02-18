import DatePickCalendar from "@/components/calendar/DatePickCalender";
import DatePickMonth from "@/components/calendar/DatePickMonth";
import DatePickYear from "@/components/calendar/DatePickYear";
import GNB from "@/components/GNB";
import Organization from "@/components/organization/Organization";
import PeriodPick from "@/components/calendar/PeriodPick";
import UploadFile from "@/components/UploadFile";
import Image from "next/image";
import PageOrganization from "@/components/organization/PageOrganization";
import PageSalary from "@/components/salary/PageSalary";

export default function Home() {
  return (
    <>
      <PageOrganization/>
      <PageSalary/>
      <GNB />
      
      {/* <DatePickMonth/>
      <DatePickYear/>
      <UploadFile/> */}
    </>
  )
}
