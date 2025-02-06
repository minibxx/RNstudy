import Link from 'next/link'

export default function Page() {
  return(
    <div className='flex justify-evenly p-[20px]'>
      <Link href="/custom">customStamp</Link>
      <Link href="/mystamp">myStamp</Link>
    </div>
  )
}

