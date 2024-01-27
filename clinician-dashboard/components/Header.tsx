

export default function Header() {

  return (

    // <nav className="relative flex w-full items-center justify-end bg-white py-2 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
    <nav className="bg-white py-2.5 dark:bg-gray-800 mx-auto w-full">
      <div className="flex flex-wrap justify-between items-center gap-10">
        <div className="bg-red-500 mx-10">
          <img src="https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/277133714_363958999071241_8561495689455662987_n.png?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ZgITgfRy8scAX_iEOiO&_nc_ht=scontent-hou1-1.xx&oh=00_AfCP8u9EZD2fYS-yrGs1L0LkbqQ_zT0iYYkdP6-WnOkFEQ&oe=65B97CA1" className="w-20" alt="THI logo"/>
        </div>
        <div>
          <h1 className="text-lg">Clinician Dashboard</h1>
        </div>
        <div className="mx-10">
          <button className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-500">Logout</button>
        </div>
      </div>
    </nav>
  )
}
