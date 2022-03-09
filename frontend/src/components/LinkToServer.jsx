import {useState, useEffect} from "react" 
import Axios from "axios"
import { Table, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap"

export default function LinkToServer() {
    const [DatenList, setDatenList] = useState ([])

    useEffect(()=> {
        Axios.get("http://localhost:3005/getEntries")
        .then((response)=>{
            setDatenList(response.data)

        })

    },[])
    console.log("DATA", DatenList)
    return (
        <div>
            <h1> We are almost there</h1>
            <Table responsive striped bordered hover variant="light" className="Listartikel" >
<thead>
    <tr>
        <th>Material</th>
        <th>Menge</th>
        <th>chargen-Nr</th>
        <th>Fortlaufende-Nr</th>
        <th>Zeitstempel</th>
        <th>Bearbeiten</th>
    </tr>
</thead>
<tbody>
    {DatenList.length > 0 && DatenList.map((artikel, index) => (

        <tr key={artikel.chargenNr}>
            <>
                <td className="companyName">{artikel.material}</td>
                <td className="jobTitle">{artikel.mengen}</td>
                <td className="jobLink">{artikel.chargenNr}</td>
                <td className="jobLink">{artikel.fortlaufendeNr}</td>
                <td className="jobLink">{artikel.createdAt}</td>
                <td className="jobLink"><Button variant="secondary">Spcheichern</Button></td>              
            </>
        </tr>
    ))}

</tbody>
</Table>
        </div>
    )
}