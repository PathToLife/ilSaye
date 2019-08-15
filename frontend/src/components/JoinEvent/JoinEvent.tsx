import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

import classes from "./JoinEvent.module.css";
import AuthContext from "../../context/auth-context";

type joinEventPanelTypes = {}
const JoinEventPanel: React.FC<joinEventPanelTypes> = (props) => {
    const authContext = useContext(AuthContext);

    if (authContext.authenticated) return <Redirect to="dashboard"/>;

    const colConfig = {xs: 12, md: 6, lg: 3};

    return (
        <div className={classes.JoinEvent}>
            <Container className="pt-5 pl-md-5 pr-md-5 pb-md-2">
                <Row>
                    <Col>
                        <div className={classes.fontTitle}>JoinEvent</div>
                    </Col>
                </Row>
                <Row className="mt-3 mt-lg-5 justify-content-md-center">
                    <Col {...colConfig}>
                        <Accordion className="m-auto w-100">
                            <Card className={classes.card}>
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
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>
                        <Button variant="primary" className="w-100">Google</Button>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>
                        <Button variant="primary" className="w-100" onClick={() => authContext.login('', '')}>
                            !Dev skip login!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default JoinEventPanel;