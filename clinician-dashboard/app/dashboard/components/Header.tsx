import thi_logo from '../../../app/thi_logo.png'
import Link from 'next/link';


export default function Header() {

  return (

    // <nav className="relative flex w-full items-center justify-end bg-white py-2 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
    <nav className="bg-white py-2.5 dark:bg-gray-800 mx-auto w-screen">
      <div className="flex flex-wrap justify-between items-center gap-10">
        <div className="bg-red-500 mx-10">
          <img src={thi_logo.src} className="w-20" alt="THI logo"/>
        </div>
        <div className="flex flex-row gap-x-5">
          <Link href="/dashboard">
            <h1 className="text-lg text-white hover:text-blue-500 transition-colors duration-300">Clinician Dashboard
            </h1>
          </Link>
          <Link href="/add_clinician">
          <h1 className="text-lg text-white hover:text-blue-500 transition-colors duration-300">Add Clinician</h1>
          </Link>

        </div>
        <div className="mx-10">
          <form action="/auth/logout" method="post">
            <button type="submit" className="bg-red-600 px-5 py-2 text-white dark:text-white rounded-lg hover:bg-red-500">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  )
}
