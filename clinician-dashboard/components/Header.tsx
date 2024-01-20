

export default function Header() {

  return (

    // <nav className="relative flex w-full items-center justify-end bg-white py-2 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
    <nav className="bg-white py-2.5 dark:bg-gray-800 mx-auto w-full">
      <div className="flex flex-wrap justify-between items-center gap-10">
        <div className="bg-red-500 mr-3 h-10 text-center mx-10">
          <h1>THI Logo</h1>
        </div>
        <div>
          <h1>Clinician Dashboard</h1>
        </div>
        <div className="mx-10">
          Logout
        </div>
      </div>
    </nav>
  )
}
