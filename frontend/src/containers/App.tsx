import React, {useState, useEffect} from 'react';
import ScreenSaver from "../components/ScreenSaver/ScreenSaver";
import classes from './App.module.css';
import socketIOClient from "socket.io-client";
import UsersOnline from "../components/UsersOnline/UsersOnline";
import MainPanel from "../components/MainPanel/MainPanel";
import MainNav from "../components/Navigation/MainNav";
import AuthContext from '../context/auth-context';

const App: React.FC = () => {

    const [endpoint] = useState('http://localhost:8080/api');
    const [weatherData, setWeather] = useState('');
    const [usersOnline, setUsersOnline] = useState(0);

    const [eventID, setEventID] = useState(null);

    useEffect(() => {
        console.log('run once');
        const socket = socketIOClient(endpoint, {path: '/socket'});
        socket.on("weatherNotification", (data: string) => {
            setWeather(data);
        });
        socket.on("usersOnline", (data: number) => {
            setUsersOnline(data);
        });
        socket.emit("hello", {map: 4, coords: '0.0'})
    }, []);

    const joinEvent = (eventID: string) => {

    };

    const [isAuthenticated, setAuthenticated] = useState(false);

    const loginHandler = (username: string, password: string) => {
        setAuthenticated(true);
        return true
    };

    const logoutHandler = () => {
        setAuthenticated(false);
        return true;
    };

    const content = (() => {
        if (isAuthenticated) {
            return (
                <div>
                    <MainNav/>
                    <MainPanel/>
                </div>
            )
        } else {
            return <ScreenSaver onClick={() => loginHandler('', '')} usersOnline={usersOnline}/>
        }
    })();

    return (
        <AuthContext.Provider
            value={{
                authenticated: isAuthenticated,
                login: loginHandler,
                logout: logoutHandler
            }}
        >
            <div className={classes.App}>
                {content}
            </div>
        </AuthContext.Provider>
    );
};

export default App;
