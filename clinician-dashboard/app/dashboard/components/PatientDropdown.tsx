import React, { useState } from 'react';

interface DropdownButtonProps {
    patients: any[];
    updateSelectedChild: (child:any) => void;
}

const PatientDropdown: React.FC<DropdownButtonProps> = ({patients, updateSelectedChild}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState("Select Patient")

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex justify-center w-full shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white  font-medium rounded-lg px-5 py-2.5 "
                id="dropdown-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
            >
                {selected}
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-zinc-600 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-menu-button"
                >
                {/* Dropdown content goes here */}
                <div className="py-1" role="none">
                    {patients.map(e => <p className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-500 dark:hover:text-white" onClick={() => {setSelected(e.name); setIsOpen(!isOpen); updateSelectedChild(e.id)}} role="menuitem" 
                    key={e.id}>
                        {e.name}
                    </p>)}
                </div>
                </div>
            )}
            </div>
        </>
    )

}

export default PatientDropdown