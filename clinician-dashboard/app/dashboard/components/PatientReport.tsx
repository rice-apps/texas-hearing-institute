import { traceDeprecation } from "process"

interface TableProps {
    reports: any[]
}

function formatDate(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const year = inputDate.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

const PatientReport:React.FC<TableProps> = ({reports}) => {
    return(
        <div className="overflow-scroll w-full">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs w-full text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="grid grid-cols-9 px-5">
                        <th className="py-4">Date</th>
                        <th className="py-4">Type</th>
                        <th className="py-4">Subtype</th>
                        <th className="py-4">Mode</th>
                        <th className="py-4">Vowel Type</th>
                        <th className="py-4">Number of Syllables</th>
                        <th className="py-4">Sound</th>
                        <th className="py-4">Combinations</th>
                        <th className="py-4">Correct-Incorrect</th>
                    </tr>
                </thead>
                <tbody className="w-full text-xs">
                        {reports.map(r => <tr className="grid grid-cols-9 px-5 bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-b-lg" key={r.id}>
                                                <td className="py-4">{formatDate(r['created_at'])}</td>
                                                <td className="py-4">{r.type}</td>
                                                <td className="py-4">{r.subtype}</td>
                                                <td className="py-4">{r.mode}</td>
                                                <td className="py-4">{r.voweltype}</td>
                                                <td className="py-4">{r['num_syllables']}</td>
                                                <td className="py-4">{r.sound}</td>
                                                <td className="py-4">{"["+r.combinations.map(c => c)+"]"}</td>
                                                <td className="py-4">{"["+r['correct_incorrect'].map(b => b)+"]"}</td>
                                        </tr>)}
                    </tbody>
            </table>
        </div>
    )
}

export default PatientReport