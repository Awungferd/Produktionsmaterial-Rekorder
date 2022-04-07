import { Alert, Card, Button, DropdownButton,Dropdown,Col, InputGroup,Row,Form, FormControl} from "react-bootstrap"
import { useState} from "react"

export default function MobileDisplay(
    { inventoryData, createNewEntry, setInventoryData,
        material, setMaterial,
        chargenNr, setChargenNr,
        menge, setMenge,
        idBearbeiten, setBearbeiten,
        editEntryById, setEditById }
) {
    const [selectItem, setSelected] = useState("") 
  
    const handleSelect = (e)=>{
        setSelected(e)
    }
   
    return (
        <div style={{ border: "2px solid blue", height: "auto", width: "480px", margin: "auto" }}>
            <InputGroup>
                <FormControl aria-label="Text input with dropdown button"
                placeholder="Artikel Name Schreiben"
                onChange={(e) => {setMaterial(e.target.value)}}
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
        const option = `"LFD-Nr:" ${index}  "Artikel:" ${element.material} "Menge:"${element.menge}, "Chrgen-Nr:" ${element.chargenNr}, "ZeitStempe:" ${element.createdAt}`
     
        
     
      
        return <Dropdown.Item key={element._id} eventKey={option} > {element.material}</Dropdown.Item>
                            })) : (null)}

                </DropdownButton>
                <Alert variant="success">
  <Alert.Heading>Produkt Erfassung</Alert.Heading>
  <hr />
  <h5 style={{color:"tomato"}}>{selectItem}</h5> 

  <hr />
  <Card>
      <Card.Body>
  <Col> </Col>
                    <InputGroup>
                        <FormControl
                            type="number"
                            placeholder="Chargen-Nr"
                            onChange={(e) => {setChargenNr(e.target.value)}}
                        />
                        <FormControl
                            type="number"
                            placeholder="Menge"
                            onChange={(e) => {setMenge(e.target.value)}}
                        />
                    </InputGroup>
                </Card.Body>
                <Card.Footer > <Button style={{ marginLeft: "70%" }} onClick={createNewEntry} variant="dark">Speichern</Button></Card.Footer>
            </Card>
</Alert>
</InputGroup>           
</div>
    )
}
