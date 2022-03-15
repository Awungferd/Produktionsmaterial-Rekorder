
export default function EditableRows({
    modifyEntry, setMaterial, material, handleSubmit,
    setMenge, menge, setChargenNr, chargenNr,
    artikel, index }) {

    return (
        <tr>
            <td> {index + 1} </td>
            <td> <input type="text"
                required="required"
                placeholder="Artikel name einfüllen"
                onChange={(e) => setMaterial(e.target.value)}
                value={material}
            />
            </td>
            <td> <input type="number"
                required="required"
                placeholder="Menge einfüllen"
                onChange={(e) => setMenge(e.target.value)}
                value={menge}
            />
            </td>
            <td >
                <input type="number"
                    required="required"
                    placeholder="Menge einfüllen"
                    value={chargenNr}
                    onChange={(e) => setChargenNr(e.target.value)}
                   
                />
            </td>
            <td>{artikel.createdAt}</td>
            <td ><button variant="secondary"  >Speichern</button> </td>
        </tr>

    )
}