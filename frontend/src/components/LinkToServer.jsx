import { useState, useEffect } from "react"
import Axios from "axios"
import { nanoid } from 'nanoid'
import ReadOnlyTableRows from "./ReadOnlyTable"
import EditableRows from "./EditableTable"
import { Table, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap"
import MobileDisplay from "./MobileDisplay"

export default function LinkToServer() {
    const [inventoryData, setInventoryData] = useState([])
    const [material, setMaterial] = useState("")
    const [chargenNr, setChargenNr] = useState("")
    const [menge, setMenge] = useState("")
    const [idBearbeiten, setBearbeiten] = useState(null)
    const [editEntryById, setEditById] = useState("") // selects an Id to edit entries associated with it   

    useEffect(() => {
        Axios.get("http://localhost:3005/getEntries").then((response) => {
            setInventoryData(response.data)
        })
    }, [])

    const createNewEntry = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3005/postErschaffen", { material, chargenNr, menge })
            .then((response) => {
                alert("Material gespeichert!")
            })
            .catch((error) => { alert(error.message) })
        setMaterial("")
        setChargenNr("")
        setMenge("")
        window.location.reload(true);
    }
    //======================
    function modifyEntry(_id) {

        Axios.patch("http://localhost:3005/bearbeiten", {
            material,
            chargenNr,
            menge,
            _id: editEntryById
        })
            .then((response) => {
                alert("Data saved!")
            })
            .catch((error) => { alert(error.message) })
        setEditById("")
        setMaterial("")
        setChargenNr("")
        setMenge("")
        window.location.reload(true);
    }
    //==================
    return (<div>
        <h1> Materialbestand</h1>


        {/* CREATE NEW POST */}
        <div style={{ border: "1px solid tomato", background: "orange" }}>
            <input type="text" placeholder="Artikel name"
                onChange={(e) => {
                    setMaterial(e.target.value)
                }
                } />
            <input type="number" placeholder="ChargenNr einfüllen"
                onChange={
                    (e) => {
                        setChargenNr(e.target.value)
                    }
                } />
            <input type="number" placeholder="Menge einfüllen"
                onChange={
                    (e) => {
                        setMenge(e.target.value)
                    }
                } />
            <button onClick={createNewEntry}>Speichern</button>
        </div>

        {/* ==========INSERT TABLE  */}

        <Table variant="info" bordered={false} responsive striped hover size="sm">
            <thead><tr key={"cheese-" + nanoid()}>
                <th>Fortlaufende-Nr</th>
                <th>Material</th>
                <th>Menge</th>
                <th>chargen-Nr</th>
                <th>Zeitstempel</th>
                <th>Bearbeiten</th>
            </tr>
            </thead>
            <tbody >
                {inventoryData.map((element, index) => {
                    return (
                        <>
                            {editEntryById === element._id ? (<tr >
                                <td >{index + 1}</td>
                                <td > <input type="text" required="required" placeholder="Artikel name"
                                    onChange={(e) => setMaterial(e.target.value)} value={material} /></td>
                                <td > <input type="number" required="required" placeholder="Menge einfüllen"
                                    onChange={(e) => setMenge(e.target.value)} value={menge} /></td>
                                <td > <input type="number" required="required" placeholder="ChargenNr einfüllen"
                                    onChange={(e) => setChargenNr(e.target.value)} value={chargenNr} /></td>
                                <td > {element.createdAt} </td>
                                <td> <Button variant="success" onClick={() => modifyEntry(element._id)}>Speichern</Button></td>

                            </tr>) : (<tr key={"cherios-" + nanoid()} >
                                <td  >{index + 1}</td>
                                <td > {element.material}</td>
                                <td > {element.menge}</td>
                                <td > {element.chargenNr}</td>
                                <td  > {element.createdAt} </td>
                                <td > <Button variant="outline-primary" onClick={() => setEditById(element._id)}>Bearbeiten</Button>
                                    <Button variant="outline-danger" onClick={() => setEditById(element._id)}>löschen</Button>
                                </td>
                            </tr>)}
                        </>

                    )
                }

                )}

            </tbody>

        </Table>

    </div>)
}
