import { useState, useEffect } from "react"
import Axios from "axios"
import { Table, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap"

export default function LinkToServer() {
    const [DatenList, setDatenList] = useState([])
    const [material, setMaterial] = useState("")
    const [chargenNr, setChargenNr] = useState(null)
    const [menge, setMenge] = useState(null)
    useEffect(() => {
        Axios.get("http://localhost:3005/getEntries")
            .then((response) => {
                setDatenList(response.data)

            })

    }, [])
    const materialErfassung = () => {
        Axios.post("http://localhost:3005/postErschaffen", {
            material,
            chargenNr,
            menge,
        }).then((response) => {
            console.log(response);
            alert("Material gespeichert!")
            setDatenList([...DatenList, { material, chargenNr, menge }])
        });
    }

    return (
        <div>
            <h1> Materialbestand</h1>
            <Table responsive striped bordered hover variant="light" className="Listartikel" >
                <thead>
                    <tr>
                        <th>Fortlaufende-Nr</th>
                        <th>Material</th>
                        <th>Menge</th>
                        <th>chargen-Nr</th>
                        <th>Zeitstempel</th>
                        <th>Bearbeiten</th>
                    </tr>
                </thead>
                <tbody>
                    {DatenList.length > 0 && DatenList.map((artikel, index) => (

                        <tr key={artikel._id}>
                            <>
                                <td>{index + 1}</td>
                                <td >{artikel.material}</td>
                                <td >{artikel.menge}</td>
                                <td >{artikel.chargenNr}</td>
                                <td>{artikel.createdAt}</td>
                                <td ><Button variant="secondary">Speichern</Button></td>
                            </>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <div>
                <input type="text" placeholder="Artikel name" onChange={(e) => { setMaterial(e.target.value) }} />
                <input type="number" placeholder="ChargenNr einfüllen" onChange={(e) => { setChargenNr(e.target.value) }} />
                <input type="number" placeholder="Menge einfüllen" onChange={(e) => { setMenge(e.target.value) }} />
                <button onClick={materialErfassung}>Speichern</button>
            </div>
        </div>
    )
}