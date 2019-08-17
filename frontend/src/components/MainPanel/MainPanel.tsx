import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import ChatPanel from "../Chat/ChatPanel";
import {Redirect} from "react-router";
import AppContext from "../../context/AppContext";

const MainPanel: React.FC = () => {

    const authContext = React.useContext(AppContext);
    if (!authContext.authenticated) return <Redirect to='/join'/>;

    return (
        <Container>
            <Row>
                <ChatPanel/>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>
    );
};

export default MainPanel