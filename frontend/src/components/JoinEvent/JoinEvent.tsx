import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

import classes from "./JoinEvent.module.css";
import AppContext from "../../context/AppContext";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import GoogleLoginButton from "./GoogleLogin";

type joinEventPanelTypes = {}
const JoinEventPanel: React.FC<joinEventPanelTypes> = () => {
    const appContext = useContext(AppContext);

    if (appContext.authenticated) return <Redirect to="dashboard"/>;

    const colConfig = {xs: 12, md: 7, lg: 5};

    return (
        <div className={classes.JoinEvent}>
            <Accordion className="m-auto w-100" defaultActiveKey="login">
                <Container className="pt-5 pl-md-5 pr-md-5 pb-md-2">
                    <Row>
                        <Col>
                            <div className={classes.fontTitle}>Let's Join Everyone</div>
                        </Col>
                    </Row>
                    <Row className="mt-3 mt-lg-5 justify-content-md-center">
                        <Col {...colConfig}>
                            <Card className={classes.card}>
                                <Card.Header className="p-0">
                                    <Accordion.Toggle as={Button} eventKey="login">
                                        Login
                                    </Accordion.Toggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey="login">
                                    <Card.Body>
                                        <LoginForm loginHandler={appContext.loginRequest}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-md-center">
                        <Col {...colConfig}>
                            <GoogleLoginButton/>
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-md-center">
                        <Col {...colConfig}>
                            <Card className={classes.card}>
                                <Card.Header className="p-0">
                                    <Accordion.Toggle as={Button} eventKey="signUp">
                                        Sign Up
                                    </Accordion.Toggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey="signUp">
                                    <Card.Body>
                                        <SignUpForm signUpHandler={appContext.loginRequest}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Accordion>
        </div>
    )
};

export default JoinEventPanel;