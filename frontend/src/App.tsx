import React, {useState, useEffect} from 'react';
import ScreenSaver from "./components/ScreenSaver/ScreenSaver";
import './App.module.css';
import socketIOClient from "socket.io-client";

const App: React.FC = () => {

    const [screenSaver, setScreenSaver] = useState(true);
    const [weatherEndpoint] = useState('http://127.0.01:8080');
    const [weatherData, setWeather] = useState('');

    const toggleScreenSaver = () => setScreenSaver(!screenSaver);

    useEffect(() => {
        console.log('run once');
        const socket = socketIOClient(weatherEndpoint);
        socket.on("FromAPI", (data:string) => {
            setWeather(data);
        })
    }, []);

    return (
        <div className="App">
            {weatherData}
            {screenSaver ? <ScreenSaver onClick={toggleScreenSaver}/> : null}
            {!screenSaver ? <button onClick={toggleScreenSaver} className={"fa fa-pause"}/> : null}
        </div>
    );
};

export default App;
