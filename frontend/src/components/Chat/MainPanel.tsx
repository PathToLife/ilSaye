import React, {useContext, useEffect} from "react";
import {Col, Container, Row} from 'react-bootstrap';
import ChatPanel from "./ChatPanel";
import {Redirect} from "react-router";
import AppContext, {NoticeLevel} from "../../context/AppContext";
import {useCookies} from "react-cookie";
import JoinEvent from "./EventControls/JoinEvent";
import CreateEvent from "./EventControls/CreateEvent";
import SendMessage from "./EventControls/SendMessage";
import socketsStore from "../../sockets/socketStore";

const MainPanel: React.FC = () => {
    const appContext = useContext(AppContext);
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        if (socketsStore.private !== null) {
            socketsStore.private.on('receiveMessage', (data: { username: string, message: string }) => {
                const {username, message} = data;
                appContext.addNotifications(`${username} ${message}`, NoticeLevel.Neutral);
            })
        }
        return () => {
            if (socketsStore.private !== null) {
                socketsStore.private.off('receiveMessage');
            }
        }
    });

    if (!appContext.authenticated) return <Redirect to='/join'/>;

    const jwt = cookies['jwt'];

    const joinEvent = (eventName: string) => {
        if (socketsStore.private === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        socketsStore.private.emit("joinEvent", {jwt, eventName}, (response: boolean | string) => {
            if (response === true) {
                appContext.addNotifications(`Joined ${eventName}`, NoticeLevel.Good);
                appContext.setEventName(eventName);
            } else {
                appContext.addNotifications(`Failed to Join "${eventName}" ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    const createEvent = (eventName: string) => {
        if (socketsStore.private === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        socketsStore.private.emit("createEvent", {jwt, eventName}, (response: string | boolean) => {
            if (response === true) {
                appContext.addNotifications(`Created ${eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed to Create "${eventName}" ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    const sendMessage = (message: string) => {
        if (socketsStore.private === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        socketsStore.private.emit("sendMessage", {
            jwt,
            eventName: appContext.eventName,
            message
        }, (response: string | boolean) => {
            if (response === true) {
                appContext.addNotifications(`Sent ${appContext.eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed To Send msg ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <CreateEvent createEvent={createEvent}/>
                    <JoinEvent joinEvent={joinEvent}/>
                    <SendMessage sendMessage={sendMessage}/>
                </Col>
                <Col>
                    <ChatPanel privateSocket={socketsStore.private}/>
                </Col>
            </Row>
            {/*<Row className="m-3">*/}
            {/*    <Col md={4}>*/}
            {/*        <JoinEvent joinEvent={joinEvent}/>*/}
            {/*    </Col>*/}
            {/*    <Col md={4}>*/}
            {/*        <SendMessage sendMessage={sendMessage}/>*/}
            {/*    </Col>*/}
            {/*    <Col md={4}>*/}
            {/*        <CreateEvent createEvent={createEvent}/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
};

export default MainPanel