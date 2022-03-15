import { useState, useEffect } from "react"
import Axios from "axios"
import { nanoid } from 'nanoid'
import ReadOnlyTableRows from "./ReadOnlyTable"
import EditableRows from "./EditableTable"
import { Table, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap"

export default function LinkToServer() {
    const [inventoryData, setInventoryData] = useState([])
    const [material, setMaterial] = useState("")
    const [chargenNr, setChargenNr] = useState(null)
    const [menge, setMenge] = useState(null)
    const [idBearbeiten, setBearbeiten] = useState(null)
    const [editEntryById, setEditById] = useState("") // selects an Id to edit entries associated with it   

    useEffect(() => {
        Axios.get("http://localhost:3005/getEntries").then((response) => {
            setInventoryData(response.data)
        })
    }, [])

    const createNewEntry = () => {
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
    const bearbeitenHandeln = (e, artikel) => {
        let index;
        e.preventDefault();
        setBearbeiten(index);
        console.log("HUHU", idBearbeiten)
    }
    return (<div>
        <h1> Materialbestand</h1>
        <Form>
            <Table responsive striped bordered hover variant="light" className="Listartikel">
                <thead><tr>
                    <th>Fortlaufende-Nr</th>
                    <th>Material</th>
                    <th>Menge</th>
                    <th>chargen-Nr</th>
                    <th>Zeitstempel</th>
                    <th>Bearbeiten</th>
                </tr>
                </thead>
                <tbody key={"todo-" + nanoid()}>{inventoryData.length > 0 && inventoryData.map((artikel, index) => (

                    <>
                        {editEntryById === artikel._id ? (<EditableRows 
                        setMaterial={setMaterial} 
                        setChargenNr={setChargenNr} 
                        setMenge={setMenge}
                        editEntryById={editEntryById}
                            bearbeitenHandeln={bearbeitenHandeln} artikel={artikel} index={index} />) : 
                            (<ReadOnlyTableRows 
                            editEntryById={editEntryById} 
                            artikel={artikel} index={index} 
                            setEditById={setEditById} />)}
                    </>
                ))}
                </tbody>
            </Table>
        </Form>
        <div>
            <input type="text" placeholder="Artikel name"
                onChange={
                    (e) => {
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
    </div>)
}
