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

                            <thead style={{fontSize: '12px'}}>
                                <tr key={"cheese-" + nanoid()}>
                                    <th>Lfde.Nr.</th>
                                    <th>Material</th>
                                    <th>Menge</th>
                                    <th>chargen-Nr</th>
                                    <th>Zeitstempel</th>                                    
                                </tr>
                            </thead>
                            <tbody key={"cheese-" + nanoid()}>
                                <tr key={"cheese-" + nanoid()}>
                                    <td>{i+1}</td>
                                    <td>{item.material}</td>
                                    <td>{item.menge}</td>
                                    <td>{item.chargenNr}</td>
                                    <td>{item.createdAt}</td>                                    
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
                        variant="outline-secondary"
                        title="Auswählen"
                        id="input-group-dropdown-2"
                        placeholder="Produkt Name Erfassen"
                        align="end"
                        onSelect={handleSelect}
                    >
                        {inventoryData ? (inventoryData.map((element, index) => {

                            const option = `"LFD-Nr:" ${index}  "Artikel:" ${element.material}
             "Menge:"${element.menge}, "Chargen-Nr:" ${element.chargenNr},
              "ZeitStempe:" ${element.createdAt}`

                            const option0 = `<table><tr> <td>${index}  </td>  <td>${element.material}</td> 
             <td>${element.menge}</td> <td> ${element.chargenNr}</td>
              <td>${element.createdAt}</td> </tr></table> `

                            const option2 = element._id
                            return <Dropdown.Item key={element._id} eventKey={option2} > {element.material}</Dropdown.Item>

                        })) : (null)}

                    </DropdownButton>
                    <DisplaySelection />

                    <Card  style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', background:'beige' }}>
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
