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
        <div className="overflow-scroll w-screen px-10 ">
            <table className="w-screen text-left text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Subtype</th>
                        <th className="px-6 py-3">Mode</th>
                        <th className="px-6 py-3">Vowel Type</th>
                        <th className="px-6 py-3">Number of Syllables</th>
                        <th className="px-6 py-3">Sound</th>
                        <th className="px-6 py-3">Combinations</th>
                        <th className="px-6 py-3">Correct-Incorrect</th>
                    </tr>
                    </thead>
                    <tbody>
                            {reports.map(r => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={r.id}>
                                                    <td className="px-6 py-4">{formatDate(r['created_at'])}</td>
                                                    <td className="px-6 py-4">{r.type}</td>
                                                    <td className="px-6 py-4">{r.subtype}</td>
                                                    <td className="px-6 py-4">{r.mode}</td>
                                                    <td className="px-6 py-4">{r.voweltype}</td>
                                                    <td className="px-6 py-4">{r['num_syllables']}</td>
                                                    <td className="px-6 py-4">{r.sound}</td>
                                                    <td className="px-6 py-4">{"["+r.combinations.map(c => c)+"]"}</td>
                                                    <td className="px-6 py-4">{"["+r['correct_incorrect'].map(b => b)+"]"}</td>
                                            </tr>)}
                    </tbody>
            </table>
        </div>
    )
}

export default PatientReport