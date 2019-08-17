// Router and ReactFC
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Styling
import classes from './App.module.css';

// Components
import ScreenSaver from "../components/ScreenSaver/ScreenSaver";
import MainPanel from "../components/MainPanel/MainPanel";
import MainNav from "../components/Navigation/MainNav";
import JoinEventPanel from "../components/JoinEvent/JoinEvent";
import Notices from "../components/Notifications/Notices";

// Context
import AppContext, {defaultContext, NoticeLevel} from '../context/AppContext';

// Sockets
import socketIOClient from "socket.io-client";
import socketsStore from "../sockets/socketStore";

/**
 * Main Component for the app
 * Always Active, Holds key states, Inits AppContext.Provider
 */
const App: React.FC = () => {

    // States
    const [endpoint] = useState(process.env.REACT_APP_BACKEND_ENDPOINT ? process.env.REACT_APP_BACKEND_ENDPOINT : 'https://ilsayebackend.azurewebsites.net');
    const [usersOnline, setUsersOnline] = useState(0);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userName, setUsername] = useState('');
    const [event, setEvent] = useState(defaultContext.event);

    // ComponentOnMount
    useEffect(() => {
        console.log('App Init');
        console.log(socketsStore.public);
        socketsStore.public = socketIOClient(`${endpoint}/publicapi`, {
            path: '/socket',
            transports: ['websocket']
        });
        socketsStore.public.on("message", (data: string) => messageHandler(data));
        socketsStore.public.on("usersOnline", (data: number) => {
            setUsersOnline(data);
        });
        socketsStore.public.emit("hello", {map: 4, coords: '0.0'});
    }, [endpoint]);

    const messageHandler = (data: string) => {
    };

    const loginHandler = (username: string, password: string) => {
        setAuthenticated(true);
        setEvent({...event, name:'MSA'});
        setUsername(username);

        socketsStore.private = socketIOClient(`${endpoint}/privateapi`, {
            path: '/socket',
            transports: ['websocket']
        });
        socketsStore.private.on("message", (data:string) => {

        });
        return true
    };

    const logoutHandler = () => {
        setAuthenticated(false);
        setEvent(defaultContext.event);
        setUsername('');
        socketsStore.private = null;
        return true;
    };

    return (
        <BrowserRouter>
            <AppContext.Provider
                value={{
                    ...defaultContext,
                    event: event,
                    authenticated: isAuthenticated,
                    userName: userName,
                    login: loginHandler,
                    logout: logoutHandler,
                    endpoint: endpoint,
                    notifications: [{message:"hi", level: NoticeLevel.Bad}]
                }}
            >
                <div className={classes.App}>
                    <MainNav/>
                    <Notices/>
                    <Switch>
                        <Route exact path="/" component={() => <ScreenSaver usersOnline={usersOnline}/>}/>
                        <Route path="/dashboard" component={() => <MainPanel/>}/>
                        <Route path="/join" component={() => <JoinEventPanel/>}/>
                        <Route component={() => <div>Not Found</div>}/>
                    </Switch>
                </div>
            </AppContext.Provider>
        </BrowserRouter>
    );
};

export default App;
