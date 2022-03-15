import { Button } from 'react-bootstrap'

export default function ReadOnlyTableRows({ artikel, index, setEditById,editEntryById }) {

    return (

        <tr key={artikel._id}>
            <td>{index + 1}</td>
            <td >{artikel.material}</td>
            <td >{artikel.menge}</td>
            <td >{artikel.chargenNr}</td>
            <td>{artikel.createdAt}</td>
            <td> <Button variant="outline-primary" onClick={()=>setEditById(artikel._id)}>Bearbeiten</Button>
                <Button variant="outline-danger" onClick={() => editEntryById(artikel._id)}>löschen</Button>
            </td>
        </tr>


    )
}