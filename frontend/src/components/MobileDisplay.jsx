import { Container, Card, Button, DropdownButton, ListGroup, Dropdown, InputGroup, Col, FormControl, Table, Row } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
// import { ArtikelContext } from "../contextProviders/ArtikelContextProvider"

export default function MobileDisplay() {
    const [makeChoice, setChoice] = useState("")
    const [totalEntries] = useContext(ArtikelContext)
    const [editEntryById, setEditById] = useContext(ArtikelContext)

    const handleSelect = (e) => {
        setChoice(e)
    }
    console.log("MAKECHOICE", makeChoice)

    const Selection = () => {
        return (
            <>
                <ListGroup style={{ padding: "0" }} size="sm" horizontal>
                    <ListGroup.Item>LFD-Nr</ListGroup.Item>
                    <ListGroup.Item>Mat.</ListGroup.Item>
                    <ListGroup.Item>Menge</ListGroup.Item>
                    <ListGroup.Item>Charge-Nr!</ListGroup.Item>
                    <ListGroup.Item>Zeitst.</ListGroup.Item>
                    <ListGroup.Item>Abt</ListGroup.Item>
                </ListGroup>
                {totalEntries ? (
                    totalEntries.map((element, index) => {


                        return (
                            <>
                                {element._id === makeChoice ? (
                                    <ListGroup key={index} size="sm" horizontal>
                                        <ListGroup.Item>{index}</ListGroup.Item>
                                        <ListGroup.Item>{element.material}</ListGroup.Item>
                                        <ListGroup.Item>{element.menge}</ListGroup.Item>
                                        <ListGroup.Item>{element.chargenNr}</ListGroup.Item>
                                        <ListGroup.Item>{element.createdAt}</ListGroup.Item>
                                        <ListGroup.Item>Abt</ListGroup.Item>
                                    </ListGroup>
                                ) : (null)}</>
                        )
                    })
                ) : (null)}
            </>
        )
    }
    return (
        <div style={{ border: "2px solid blue", height: "11vh", width: "480px" }}>
            <Container >
                <Card>
                    <Card.Header><h2>Material Inventar</h2></Card.Header>
                    <Card.Body>
                        <Card.Title><h5>Artikel Erfassung</h5></Card.Title>
                        {/* Insert DropDown */}
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Text input with dropdown button"
                                placeholder="Artikel Name Schreiben"
                            />
                            <DropdownButton
                                variant="outline-secondary"
                                title="Artikel wählen"
                                id="input-group-dropdown-2"
                                align="end"
                                onSelect={handleSelect}
                            >
                                {totalEntries ? (totalEntries.map((element, index) => {
                                    const option2 = element._id
                                    const option = `${index}, ${element.material} ${element.menge}, ${element.chargenNr},${element.createdAt}`
                                    return <Dropdown.Item key={element._id} eventKey={option2} > {element.material}</Dropdown.Item>
                                })) : (null)}


                            </DropdownButton>
                        </InputGroup>
                        <Col>  <Selection /></Col>
                        <InputGroup>
                            <FormControl
                                type="number"
                                placeholder="Chargen-Nr"
                            />
                            <FormControl
                                type="number"
                                placeholder="Menge"
                            />
                        </InputGroup>
                    </Card.Body>
                    <Card.Footer > <Button style={{ marginLeft: "70%" }} variant="dark">Speichern</Button></Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

