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

// Define function to determine CSS class based on percentage value
const getPercentageColor = (correctIncorrectArray: boolean[]) => {
    const percentage = (correctIncorrectArray.reduce((count, currentValue) => count + (currentValue ? 1 : 0), 0) / correctIncorrectArray.length) * 100;
    
    // Determine the CSS class based on the percentage value
    if (percentage >= 66) {
        return 'bg-green-300'; // Green color for percentages >= 66%
    } else if (percentage >= 33) {
        return 'bg-yellow-300'; // Yellow color for percentages >= 33% and < 66%
    } else {
        return 'bg-red-300'; // Red color for percentages < 33%
    }
};

const PatientReport:React.FC<TableProps> = ({reports}) => {
    //console.log(reports)
    return(
        <div className="overflow-scroll w-full">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs w-full text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="grid grid-cols-9 px-5">
                        <th className="py-4">Date</th>
                        <th className="py-4">Type</th>
                        <th className="py-4">Subtype</th>
                        <th className="py-4">Mode</th>                        
                        <th className="py-4">Sound</th>
                        <th className="py-4">Syllables</th>
                        <th className="py-4">Vowel</th>
                        <th className="py-4">Syllable Amount</th>
                        <th className="py-4">Correct</th>
                    </tr>
                </thead>
                <tbody className="w-full text-xs">
                        {reports.map(r => <tr className="grid grid-cols-9 px-5 bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-b-lg" key={r.id}>
                                                <td className="py-4">{formatDate(r['created_at'])}</td>
                                                <td className="py-4">{r.type}</td>
                                                <td className="py-4">{r.subtype}</td>
                                                <td className="py-4">{r.mode}</td>
                                                <td className="py-4">{r.target}</td>
                                                <td className="py-4">{"["+r.syllables.map(c => c)+"]"}</td>
                                                <td className="py-4">{r.voweltype}</td>
                                                <td className="py-4">{r['num_syllables']}</td>
                                                <td className="py-4 text-black">
                                                    <div className={`inline p-1 rounded-xl ${getPercentageColor(r.results)}`}>
                                                    {((r.results.reduce((count, currentValue) => count + (currentValue ? 1 : 0), 0) / r.results.length) * 100).toFixed(1) +"%"}
                                                    </div>
                                                </td>
                                        </tr>)}
                    </tbody>
            </table>
        </div>
    )
}

export default PatientReport