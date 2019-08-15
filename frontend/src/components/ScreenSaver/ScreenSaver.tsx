import React from "react";
import classes from "./ScreenSaver.module.css";
import UsersOnline from "../UsersOnline/UsersOnline";

type ScreenProps = {
    onClick: any,
    usersOnline: number
}
const ScreenSaver: React.FC<ScreenProps> = ({onClick, usersOnline}) => {
    return (
        <header className={classes.ScreenSaver}>
            <div className={classes.logo}>ilSaye</div>
            <div className={classes.slogan}>
                {/*<i className={"fab fa-pied-piper-hat"}/>*/}
                talka talk
                <br/>
                walka walk
            </div>
            <UsersOnline count={usersOnline}/>
            <button className="fas fa-play" onClick={onClick}/>
            <div>
                give yourself a voice within an audience of thousands
            </div>
        </header>
    )
};

export default ScreenSaver