import React, {useState} from 'react';
import ScreenSaver from "./components/ScreenSaver/ScreenSaver";
import './App.module.css';

const App: React.FC = () => {

    const [screenSaver, setScreenSaver] = useState(true);

    const toggleScreenSaver = () => setScreenSaver(!screenSaver);

    return (
        <div className="App">
            {screenSaver ? <ScreenSaver onClick={toggleScreenSaver}/> : null}
        </div>
    );
};

export default App;
