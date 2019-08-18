// Router and ReactFC
import React, {useEffect, useState} from 'react';
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
import {GetLocalData, SetLocalData} from '../context/VersionedLocalStorage';
// Sockets & axios
import socketIOClient from "socket.io-client";
import socketsStore from "../sockets/socketStore";
import {NoticeType} from "../components/Notifications/Notice";
import axios from "axios";
import {useCookies} from "react-cookie";

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
    const [notifications, setNotifications] = useState([] as NoticeType[]);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const setNotificationsHandler = (notifications: NoticeType[]) => {
        SetLocalData('notifications', JSON.stringify(notifications));
        setNotifications(notifications)
    };

    const enablePublicSocket = () => {
        socketsStore.public = socketIOClient(`${endpoint}/publicapi`, {
            path: '/socket',
            transports: ['websocket']
        });
        socketsStore.public.on("message", (data: string) => messageHandler(data));
        socketsStore.public.on("usersOnline", (data: number) => {
            setUsersOnline(data);
        });
        socketsStore.public.emit("hello", {map: 4, coords: '0.0'});
    };

    const enablePrivateSocket = () => {
        socketsStore.private = socketIOClient(`${endpoint}/privateapi`, {
            path: '/socket',
            transports: ['websocket']
        });
        socketsStore.private.on("message", (data: string) => {

        });
    };
    const disablePrivateSocket = () => {socketsStore.private = null};

    // ComponentOnMount
    useEffect(() => {
        console.log('App Init');

        enablePublicSocket();

        if (cookies['jwt']) {
            axios.get(`${endpoint}/api/v1/auth?token=${cookies['jwt']}`, {
                validateStatus: status => status < 500
            }).then(response => {
                if (response.status === 200) {
                    console.log(`Valid Cookie ${JSON.stringify(response.data)}`);
                    setLoggedInDetails(response.data.username);
                } else if (response.status === 401) {
                    console.log(`Invalid Cookie ${JSON.stringify(response.data)}`);
                    removeCookie('jwt');
                }
            });
        }

        // Get old notifications
        const localNotices = GetLocalData('notifications');
        if (localNotices != null) setNotifications(JSON.parse(localNotices));
        if (localNotices === null) setNotifications(defaultContext.notifications);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]);

    const messageHandler = (data: string) => {

    };

    const addNotificationsHandler = (message: string, level: NoticeLevel) => {
        const noticesCopy = [...notifications];
        noticesCopy.push({message, level});
        setNotificationsHandler(noticesCopy);
    };

    const setLoggedInDetails = (username: string, jwt?:string, eventName:string = 'MSA') => {
        setAuthenticated(true);
        setEvent({...event, name: eventName});
        setUsername(username);
        if (jwt) setCookie('jwt', jwt, {maxAge: 3600});
        setNotificationsHandler([]);
    };

    const loginHandler = (email: string, password: string): boolean => {
        axios.post(`${endpoint}/api/v1/login`, {
            email, password
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setLoggedInDetails(response.data.username, response.data.jwt);
                enablePrivateSocket();
                return true;
            }
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                addNotificationsHandler(error.response.data.msg, NoticeLevel.Bad);
            } else {
                addNotificationsHandler(error.toString(), NoticeLevel.Bad);
            }
            return false
        });
        return true
    };

    const logoutHandler = () => {
        axios.get(`${endpoint}/api/v1/logout`)
            .then(() =>{})
            .catch( error => addNotificationsHandler(error.toString(), NoticeLevel.Bad));

        setAuthenticated(false);
        setEvent(defaultContext.event);
        setUsername('');
        removeCookie('jwt');
        disablePrivateSocket();
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
                    setLoggedInDetails: setLoggedInDetails,
                    loginRequest: loginHandler,
                    logoutRequest: logoutHandler,
                    endpoint: endpoint,
                    notifications: notifications,
                    addNotifications: addNotificationsHandler
                }}
            >
                <div className={classes.App}>
                    <MainNav/>
                    <Notices setNotificationsHandler={setNotificationsHandler}/>
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
