import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import classes from "./ChatPanel.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const test_messages = [
    {user: 'bob', text: 'djwioajo jiowa jijowa', img: null},
    {user: 'bob', text: 'djwioajo jiowa jijowa', img: null},
    {user: 'bob3', text: 'djwioajo jiowa jijowa', img: null},
    {user: 'bob4', text: 'djwioajo jiowa jijowa', img: null},
    {user: 'bob5', text: 'djwioajo jiowa jijowa', img: null},
];

type TChatPanel = {
    privateSocket: SocketIOClient.Socket | null
}

const ChatPanel: React.FC<TChatPanel> = ({privateSocket}) => {

    const [messageStore, setMessageStore] = useState(test_messages);

    const makeMessage = (user: string, text: string, img: string | null, left:boolean) => {
        return (
            <Card className={classes.Card + " mt-1 " + (left ? "" : "float-right")}>
                <Card.Title>{user}</Card.Title>
                <Card.Body>{text}</Card.Body>
            </Card>
        )
    };

    const buildMessages = () => {
        const elems: any = [];
        let lastUsername:string = '';
        let alignLeft = true;
        messageStore.forEach((message, index) => {
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
        <Container className={classes.ChatPanel + " mt-5"}>
            {buildMessages()}
        </Container>
    )
};

export default ChatPanel