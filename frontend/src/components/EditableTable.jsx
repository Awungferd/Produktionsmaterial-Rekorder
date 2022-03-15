
export default function EditableRows({ setMaterial, setChargenNr, setMenge, artikel, index }) {

    return (
        <tr>
            <td> <input type="text" required="required" placeholder="Artikel name" onChange={(e) => { setMaterial(e.target.value) }} /></td>
            <td> <input type="number" required="required" placeholder="ChargenNr einfüllen" onChange={(e) => { setChargenNr(e.target.value) }} /></td>
            <td> <input type="number" required="required" placeholder="Menge einfüllen" onChange={(e) => { setMenge(e.target.value) }} /></td>
            <td >{artikel.chargenNr}</td>
            <td>{artikel.createdAt}</td>
            <td ><button variant="secondary">Speichern</button> </td>
        </tr>

    )
}