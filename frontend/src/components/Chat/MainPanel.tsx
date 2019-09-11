import React, {useState, useContext, useEffect} from "react";
import {Redirect} from 'react-router';
import {Col, Container, Row} from 'react-bootstrap';
import ChatPanel from "./ChatPanel";
import AppContext, {NoticeLevel} from "../../context/AppContext";
import {useCookies} from "react-cookie";
import JoinEvent from "./EventControls/JoinEvent";
import CreateEvent from "./EventControls/CreateEvent";
import SendMessage from "./EventControls/SendMessage";
import cx from 'classnames';

export type TMessage = {
    user: string,
    text: string,
    img: string | null
}

interface PMainPanel {
    privateSocket: SocketIOClient.Socket | null
}

const MainPanel: React.FC<PMainPanel> = ({privateSocket}) => {
    const appContext = useContext(AppContext);
    const [cookies] = useCookies(['jwt']);
    const [messages, setMessages] = useState([] as TMessage[]);


    const handlerAddMessage = (message: TMessage) => {
        setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages.push(message);

            return newMessages;
        });
    };


    useEffect(() => {
        if (privateSocket !== null) {
            privateSocket.on('receiveMessage', (data: { username: string, message: string }) => {
                const {username, message} = data;
                // appContext.addNotifications(`${username} ${message}`, NoticeLevel.Neutral);
                handlerAddMessage({
                    user: username,
                    text: message,
                    img: ''
                })
            });
        }
        return () => {
            if (privateSocket !== null) {
                privateSocket.off('receiveMessage');
            }
        }
    }, [privateSocket]);

    const jwt = cookies['jwt'];

    const joinEvent = (eventName: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        privateSocket.emit("joinEvent", {jwt, eventName}, (response: boolean | string) => {
            if (response === true) {
                appContext.addNotifications(`Joined ${eventName}`, NoticeLevel.Good);
                appContext.setEventName(eventName);
            } else {
                appContext.addNotifications(`Failed to Join "${eventName}" ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    const createEvent = (eventName: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        privateSocket.emit("createEvent", {jwt, eventName}, (response: string | boolean) => {
            if (response === true) {
                appContext.addNotifications(`Created ${eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed to Create "${eventName}" ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    const sendMessage = (message: string) => {
        if (privateSocket === null) return appContext.addNotifications(`Failed to Join, Socket Null`, NoticeLevel.Bad);
        privateSocket.emit("sendMessage", {
            jwt,
            eventName: appContext.eventName,
            message
        }, (response: string | boolean) => {

            if (response === true) {
                // appContext.addNotifications(`Sent ${appContext.eventName}`, NoticeLevel.Good)
            } else {
                appContext.addNotifications(`Failed To Send msg ${response === false ? '' : response}`, NoticeLevel.Warning)
            }
        });
    };

    if (!appContext.authenticated) return <Redirect to='/join'/>;

    return (
        <Container>
            <Row className={cx('mt-md-5', 'mt-3')}>
                <Col md={4}>
                    <CreateEvent createEvent={createEvent}/>
                    <JoinEvent joinEvent={joinEvent}/>
                    <SendMessage sendMessage={sendMessage}/>
                </Col>
                <Col>
                    <ChatPanel messages={messages}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPanel