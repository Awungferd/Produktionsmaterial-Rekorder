import { ProduktsDatein } from "./ProduktsDatein"
import { Table, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap"


export default function UserInterface() {
    console.log(ProduktsDatein)

    const currentTime = new Date()
    const timestamp = currentTime.getTime()
    return (<>
        <Table responsive striped bordered hover variant="light" className="Listartikel" >
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Menge</th>
                    <th>chargen-Nr</th>
                    <th>Fortlaufende-Nr</th>
                    <th>Zeitstempel</th>
                    <th>Bearbeiten</th>
                </tr>
            </thead>
            <tbody>
                {ProduktsDatein.length > 0 && ProduktsDatein.map((artikel, index) => (

                    <tr key={artikel.chargenNr}>
                        <>
                            <td className="companyName">{artikel.material}</td>
                            <td className="jobTitle">{artikel.menge}</td>
                            <td className="jobLink">{artikel.chargenNr}</td>
                            <td className="jobLink">{artikel.fortlaufendeNr}</td>
                            <td className="jobLink">{timestamp}</td>
                            <td className="jobLink"><Button variant="secondary">Spcheichern</Button></td>

 {/*                            <td>
                                <Row className="g-2">
                                    <Col md>
                                        <FloatingLabel controlId="floatingSelectGrid">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Select</option>
                                                <option value="1">Waiting</option>
                                                <option value="2">Interview</option>
                                                <option value="3">Employed</option>
                                                <option value="4">Rejected</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </td> */}
                            {/* <td><Button className="Boot-btn" variant="outline-success" onClick={() => deleteartikel(artikel.id)}>X</Button></td> */}
                        </>
                    </tr>
                ))}

            </tbody>
        </Table>


    </>)
}