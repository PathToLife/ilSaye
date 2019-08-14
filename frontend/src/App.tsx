import React, {useState, useEffect} from 'react';
import ScreenSaver from "./components/ScreenSaver/ScreenSaver";
import classes from './App.module.css';
import socketIOClient from "socket.io-client";

const App: React.FC = () => {

    const [screenSaver, setScreenSaver] = useState(true);
    const [endpoint] = useState('http://localhost:8080/api');
    const [weatherData, setWeather] = useState('');

    const toggleScreenSaver = () => setScreenSaver(!screenSaver);

    useEffect(() => {
        console.log('run once');
        const socket = socketIOClient(endpoint, {path:'/socket'});
        socket.on("FromAPI", (data:string) => {
            setWeather(data);
        });
        socket.emit("hello", {map: 4, coords: '0.0'})
    }, []);

    return (
        <div className={classes.App}>
            {weatherData}
            {screenSaver ? <ScreenSaver onClick={toggleScreenSaver}/> : null}
            {!screenSaver ? <button onClick={toggleScreenSaver} className={"fa fa-pause"}/> : null}
        </div>
    );
};

export default App;
