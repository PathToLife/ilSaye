import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import axios from "axios";

import classes from "./JoinEvent.module.css";
import AppContext from "../../context/AppContext";
import GoogleLogin from "react-google-login";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

type joinEventPanelTypes = {

}
const JoinEventPanel: React.FC<joinEventPanelTypes> = (props) => {
    const authContext = useContext(AppContext);

    if (authContext.authenticated) return <Redirect to="dashboard"/>;

    const responseGoogleOk = (res: any) => {
        axios.post(`${authContext.endpoint}/api/v1/logingoogle?token=${res.accessToken}`)
            .then(res => {
                if (res.status === 200) {
                    authContext.login(res.data.username, '');
                }
            })
            .catch(e => console.log(e));
    };

    const responseGoogleErr = (res: any) => {
        console.log(`Error ${res}`);
    };

    const colConfig = {xs: 12, md: 6, lg: 5};

    return (
        <div className={classes.JoinEvent}>
            <Container className="pt-5 pl-md-5 pr-md-5 pb-md-2">
                <Row>
                    <Col>
                        <div className={classes.fontTitle}>JoinEvent</div>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>

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
                                        <LoginForm loginHandler={authContext.login}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>
                        <GoogleLogin
                            clientId="495410337391-l6eu5s4fpk4228k7e2td9supfosnmhb0.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogleOk}
                            onFailure={responseGoogleErr}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>
                        <Accordion className="m-auto w-100">
                            <Card className={classes.card}>
                                <Card.Header className="p-0">
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        Sign Up
                                    </Accordion.Toggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <SignUpForm signUpHandler={authContext.login}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col {...colConfig}>
                        <Button variant="primary" className="w-100" onClick={() => authContext.login('dwada', 'dd')}>
                            !Dev skip login!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default JoinEventPanel;