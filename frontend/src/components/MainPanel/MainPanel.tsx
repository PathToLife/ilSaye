import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import ChatPanel from "../Chat/ChatPanel";
import MainNav from "../Navigation/MainNav";
import {Redirect} from "react-router";
import AuthContext from "../../context/auth-context";

const MainPanel: React.FC = () => {

    const authContext = React.useContext(AuthContext);
    if (!authContext.authenticated) return <Redirect to='/join'/>;

    return (
        <div>
            <MainNav/>
            <Container>
                <Row>
                    <Col>
                        <ChatPanel/>
                    </Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPanel