import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./JoinEvent.css";

type joinEventPanelTypes = {}
const JoinEventPanel: React.FC<joinEventPanelTypes> = (props) => {

    return (
        <div>

            <Container className="pt-5 pl-5 pr-5 pb-2">
                <Row>
                    <Col>
                        <h1>Join Event</h1>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Accordion className="m-auto w-100">
                        <Card>
                            <Card.Header className="p-0">
                                <Accordion.Toggle as={Button} eventKey="0">
                                    Login
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    djwiao

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Row>
                <Row className="mt-3">
                    <Button variant="primary" className="w-100">hi</Button>
                </Row>
            </Container>
        </div>
    )
};

export default JoinEventPanel;