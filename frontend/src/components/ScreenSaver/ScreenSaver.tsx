import React from "react";
import classes from "./ScreenSaver.module.css";
import UsersOnline from "../UsersOnline/UsersOnline";
import {Link, NavLink} from 'react-router-dom';

type ScreenProps = {
    usersOnline: number
}
const ScreenSaver: React.FC<ScreenProps> = ({usersOnline}) => {
    return (
        <header className={classes.ScreenSaver + " m-3"}>
            <div className={classes.fontTitle + " mt-5 mb-3"}>ilSaye</div>
            <div className={classes.slogan + " mb-3"}>
                {/*<i className={"fab fa-pied-piper-hat"}/>*/}
                talka talk
                <br/>
                walka walk
            </div>
            <NavLink to="/dashboard">
                <button className={classes.fontDescription + " fas fa-play"}/>
            </NavLink>
            <div>
                Give people a voice within an audience of thousands
            </div>
            <div style={{fontSize:"small"}} className="pt-3">
                <UsersOnline count={usersOnline}/>
            </div>
        </header>
    )
};

export default ScreenSaver