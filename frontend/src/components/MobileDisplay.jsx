import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Alert, Card, Table, Button, DropdownButton, Container, InputGroup, Dropdown, FormControl} from "react-bootstrap"

export default function MobileDisplay(
    { inventoryData, setInventoryData,
        material, setMaterial,
        chargenNr, setChargenNr,
        menge, setMenge,       
        editEntryById, setEditById, createNewEntry, modifyEntry, deleteItem }
) {
    const [SelectItem, setSelected] = useState("")
    const handleSelect = (e) => {
        setSelected(e)
    }
  
    function DisplaySelection() {
        const SelectedArticle = inventoryData.map((item, i) => {
            
            if (item._id === SelectItem) {
                return (
                    <>
                        <Table  striped bordered hover size="sm" style={{textAlign: 'justify'}}>

                            <thead key={1 + item._id +1} style={{fontSize: '12px'}}>
                                <tr key={5 + item._id}>
                                    <th key={item._id +1}>Lfde.Nr.</th>
                                    <th key={item._id +2}>Material</th>
                                    <th key={item._id +3}>Menge</th>
                                    <th key={item._id +4}>chargen-Nr</th>
                                    <th key={item._id +5}>Zeitstempel</th>                                    
                                </tr>
                            </thead>
                            <tbody key={2+ item._id }>
                                <tr key={2 + item._id +1} >
                                    <td key={item._id +6} >{i+1}</td>
                                    <td key={item._id +7}>{item.material}</td>
                                    <td key={item._id +8}>{item.menge}</td>
                                    <td key={item._id +9}>{item.chargenNr}</td>
                                    <td key={item._id +10}>{item.createdAt}</td>                                    
                                </tr>
                            </tbody>
                        </Table>
                    </>
                )
            } 
        })
        return (
            <>{SelectedArticle}</>
        )
    }
    return (
        <Container fluid style={{ border: '2px solid cyan', background: '#cfcfbe', height: '300px' }}>
            <Alert.Heading>Produkt Erfassung</Alert.Heading>
            <>
                <InputGroup className="mb-3">
                    <FormControl aria-label="Text input with dropdown button"
                        placeholder="Artikel Name Schreiben"
                        onChange={(e) => { setMaterial(e.target.value) }}
                    />
                    <DropdownButton
                        variant="outline-success"
                        title="Auswählen"
                        id="input-group-dropdown-2"
                        placeholder="Produkt Name Erfassen"
                        align="end"
                        onSelect={handleSelect}
                    >
                        {inventoryData ? (inventoryData.map((element, index) => {

                            const option2 = element._id
                            return <Dropdown.Item key={index}  eventKey={option2} > {element.material}</Dropdown.Item>

                        })) : (null)}

                    </DropdownButton>
                    <DisplaySelection/>

                    <Card  style={{border:"outset green 2px", width: '100%', flexDirection: 'row', justifyContent: 'space-between', background:'#cfcfbe' }}>
                        <FormControl
                            style={{ width: '40%', marginBottom: "0" }}
                            type="number"
                            placeholder="Chargen-Nr"
                            onChange={(e) => { setChargenNr(e.target.value) }}
                        />
                        <FormControl
                            style={{ width: '30%', alignSelf: 'flex-end' }}
                            type="number"
                            placeholder="Menge"
                            onChange={(e) => { setMenge(e.target.value) }}
                        />
                    </Card>                 
                    <Button style={{ marginLeft: "82%" }} onClick={createNewEntry} variant="dark">Speichern</Button>

                </InputGroup>
            </>
        </Container>
    )
}
