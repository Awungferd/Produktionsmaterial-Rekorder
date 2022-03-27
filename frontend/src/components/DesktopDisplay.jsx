
import { nanoid } from 'nanoid'
import { Table, Button} from "react-bootstrap"


export default function DesktopDisplay(
    { inventoryData, setInventoryData,
        material, setMaterial,
        chargenNr, setChargenNr,
        menge, setMenge,        
        editEntryById, setEditById,createNewEntry,modifyEntry }
) {

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
