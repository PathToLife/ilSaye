import React from "react";
import classes from "./ScreenSaver.module.css";

type ScreenProps = {
    onClick: any
}
const ScreenSaver: React.FC<ScreenProps> = ({onClick}) => {
    return (
        <header className={classes.ScreenSaver}>
            <div className={classes.logo}>ilSaye</div>
            <div className={classes.slogan}>
                {/*<i className={"fab fa-pied-piper-hat"}/>*/}
                talka talk
                <br/>
                walka walk
            </div>
            <button className={"fa fa-play"} onClick={onClick}/>
        </header>
    )
};

export default ScreenSaver