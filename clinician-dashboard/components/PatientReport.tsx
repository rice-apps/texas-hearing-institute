import { traceDeprecation } from "process"

interface TableProps {
    reports: any[]
}

const PatientReport:React.FC<TableProps> = ({reports}) => {
    return(
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Created At</th>
                    <th>Type</th>
                    <th>Subtype</th>
                    <th>Mode</th>
                    <th>Vowel Type</th>
                    <th>Number of Syllables</th>
                    <th>Sound</th>
                    <th>Combinations</th>
                    <th>Correct-Incorrect</th>
                </tr>
                </thead>
                <tbody>
                        {reports.map(r => <tr key={r.id}>
                                                <td>{r['created at']}</td>
                                                <td>{r.type}</td>
                                                <td>{r.subtype}</td>
                                                <td>{r.voweltype}</td>
                                                <td>{r.num_syllables}</td>
                                                <td>{r.sound}</td>
                                                <td>{r.combinations}</td>
                                                <td>{r['correct-incorrect']}</td>
                                        </tr>)}
                </tbody>
            
        </table>
    )
}

export default PatientReport