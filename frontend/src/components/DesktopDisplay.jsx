
import { nanoid } from 'nanoid'
import { Table, Button } from "react-bootstrap"


export default function DesktopDisplay(
    { inventoryData, setInventoryData,
        material, setMaterial,
        chargenNr, setChargenNr,
        menge, setMenge,
        editEntryById, setEditById, createNewEntry, modifyEntry, deleteItem }
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
                            {editEntryById === element._id ? (<tr key={3 + index} >
                                <td key={3 + index}>{index + 1}</td>
                                <td key={3 + index}> <input type="text" required="required" placeholder="Artikel name"
                                    onChange={(e) => setMaterial(e.target.value)} value={material} /></td>
                                <td key={3 + index}> <input type="number" required="required" placeholder="Menge einfüllen"
                                    onChange={(e) => setMenge(e.target.value)} value={menge} /></td>
                                <td key={3 + index}> <input type="number" required="required" placeholder="ChargenNr einfüllen"
                                    onChange={(e) => setChargenNr(e.target.value)} value={chargenNr} /></td>
                                <td key={3 + index} > {element.createdAt} </td>
                                <td key={3 + index}> <Button variant="success" onClick={() => modifyEntry(element._id)}>Speichern</Button></td>

                            </tr>) : (<tr key={3 + index} >
                                <td  key={4 + index}>{index + 1}</td>
                                <td key={5 + index}> {element.material}</td>
                                <td key={23 + index}> {element.menge}</td>
                                <td key={35 + index}> {element.chargenNr}</td>
                                <td key={13 + index} > {element.createdAt} </td>
                                <td key={3 + index} > <Button variant="outline-primary" onClick={() => setEditById(element._id)}>Bearbeiten</Button>
                                    <Button variant="outline-danger" onClick={() => {deleteItem(element._id) }} >X</Button>
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
