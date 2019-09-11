import React from "react";
import classes from "./ChatPanel.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cx from "classnames";
import {TMessage} from "./MainPanel";


// const test_messages: TMessage[] = [
//     {user: 'Bob', text: 'Please create an event', img: null},
//     {user: 'Sarah', text: 'Then Join It', img: null},
//     {user: 'Dylan', text: 'And send a message', img: null},
//     {user: 'Jackie', text: 'like Boh yah', img: null},
//     {user: 'Sean', text: 'Reproduce Bug, fix, create test to stop regression pls', img: null},
// ];

type TChatPanel = {
    messages: TMessage[]
}

const ChatPanel: React.FC<TChatPanel> = ({messages}) => {

    const makeMessage = (user: string, text: string, img: string | null, left:boolean) => {
        return (
            <div>
                <span className="username">{user}</span> <span>{text}</span>
                {/*<Card className={cx(classes.Card, classes.white)}>*/}
                {/*    <Card.Title>{user}</Card.Title>*/}
                {/*    <Card.Body>{text}</Card.Body>*/}
                {/*</Card>*/}
            </div>
        )
    };

    const buildMessages = () => {
        const elems: any = [];
        let lastUsername:string = '';
        let alignLeft = true;
        messages.forEach((message, index) => {
            if (message.user !== lastUsername) {
                lastUsername = message.user;
                alignLeft = !alignLeft;
            }
            const msg = makeMessage(message.user, message.text, message.img, alignLeft);
            elems.push((
                <Row key={index}>
                    <Col>{alignLeft ? msg : null}</Col><Col>{alignLeft ? null : msg}</Col>
                </Row>
            ));
        });
        return elems
    };

    return (
        <Container className={cx(classes.ChatPanel, "p-2")}>
            {buildMessages()}
        </Container>
    )
};

export default ChatPanel