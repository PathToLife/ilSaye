import React from "react";
import {Col, Container, Row} from 'react-bootstrap';
import ChatPanel from "../Chat/ChatPanel";
import {Redirect} from "react-router";
import AppContext, {NoticeLevel} from "../../context/AppContext";
import {useCookies} from "react-cookie";
import JoinEvent from "../JoinEvent/JoinEvent";
import CreateEvent from "../JoinEvent/CreateEvent";
import SendMessage from "../Chat/SendMessage";

type TMainPanel = {
    privateSocket: SocketIOClient.Socket | null
}

const MainPanel: React.FC<TMainPanel> = ({privateSocket}) => {
    const appContext = React.useContext(AppContext);
    const [cookies] = useCookies(['jwt']);
    const [eventName, setEventName] = React.useState('');

    if (!appContext.authenticated) return <Redirect to='/join'/>;

    const jwt = cookies['jwt'];

    const joinEvent = (eventName: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        privateSocket.emit("joinEvent", {jwt, eventName});
        privateSocket.on("joinEvent", (response: boolean | string) => {
            if (response === true) {
                appContext.addNotifications(`Joined ${eventName}`, NoticeLevel.Good);
                setEventName(eventName);
            } else {
                appContext.addNotifications(`Failed to Join ${eventName} ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        })
    };

    const createEvent = (eventName: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        privateSocket.emit("createEvent", {jwt, eventName});
        privateSocket.on("createEvent", (response: string | boolean) => {
            if (response === true) {
                appContext.addNotifications(`Created ${eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed to Create ${eventName} ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        })
    };

    const sendMessage = (message: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        if (eventName === '') return appContext.addNotifications(`Failed to send, please join an event`, NoticeLevel.Warning);
        privateSocket.emit("sendmessage", {jwt, eventName, message});
        privateSocket.on("sendmessage", (response: string | boolean) => {
            if (response === true) {
                appContext.addNotifications(`Sent ${eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed To Send msg ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        })
    };

    return (
        <Container>
            <Row>
                <ChatPanel privateSocket={privateSocket}/>
            </Row>
            <Row className="m-3">
                <Col md={4}>
                    <JoinEvent joinEvent={joinEvent}/>
                </Col>
                <Col md={4}>
                    <SendMessage sendMessage={sendMessage}/>
                </Col>
                <Col md={4}>
                    <CreateEvent createEvent={createEvent}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPanel