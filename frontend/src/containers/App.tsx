import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import classes from './App.module.css';

// Components
import ScreenSaver from "../components/ScreenSaver/ScreenSaver";
import MainPanel from "../components/MainPanel/MainPanel";
import MainNav from "../components/Navigation/MainNav";
import JoinEventPanel from "../components/JoinEvent/JoinEvent";

import AppContext, {defaultContext} from '../context/AppContext';


const App: React.FC = () => {

    const [endpoint] = useState('http://localhost:8080/publicapi');
    const [usersOnline, setUsersOnline] = useState(0);
    const [event, setEvent] = useState(defaultContext.event);

    useEffect(() => {
        console.log('run once');
        const socket = socketIOClient(endpoint, {path: '/socket'});
        socket.on("message", (data: string) => messageHandler(data));
        socket.on("usersOnline", (data: number) => {
            setUsersOnline(data);
        });
        socket.emit("hello", {map: 4, coords: '0.0'})


    }, [endpoint]);


    const [isAuthenticated, setAuthenticated] = useState(false);

    const messageHandler = (data: string) => {
    };

    const loginHandler = (username: string, password: string) => {
        setAuthenticated(true);
        setEvent({...event, name:'MSA'});
        return true
    };

    const logoutHandler = () => {
        setAuthenticated(false);
        setEvent(defaultContext.event);
        return true;
    };

    const r_ScreenSaver = () => (
        <ScreenSaver usersOnline={usersOnline}/>
    );

    const r_MainPanel = () => <MainPanel/>;

    const r_JoinEventPanel = () => <JoinEventPanel/>;

    const r_404 = () => <div>Not Found</div>;

    return (
        <BrowserRouter>
            <AppContext.Provider
                value={{
                    ...defaultContext,
                    event: event,
                    authenticated: isAuthenticated,
                    login: loginHandler,
                    logout: logoutHandler
                }}
            >
                <div className={classes.App}>
                    <MainNav/>
                    <Switch>
                        <Route exact path="/" component={r_ScreenSaver}/>
                        <Route path="/dashboard" component={r_MainPanel}/>
                        <Route path="/join" component={r_JoinEventPanel}/>
                        <Route component={r_404}/>
                    </Switch>
                </div>
            </AppContext.Provider>
        </BrowserRouter>
    );
};

export default App;
