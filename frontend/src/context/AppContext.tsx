import React from "react";
import {NoticeLevel, NoticeType} from "../components/Notifications/Notice";

export {NoticeLevel} from "../components/Notifications/Notice"; // Re-export here for ease of import around the place

interface defaultContextType {
    authenticated: boolean,
    event: {name: string, id:string},
    userName: string,
    setLoggedInDetails: (username:string, jwt?:string, eventName?:string) => void,
    loginRequest: (username:string, password:string) => any,
    logoutRequest: () => any,
    endpoint: string,
    notifications: NoticeType[],
    addNotifications: (msg: string, level: NoticeLevel) => void;
}

export const defaultContext: defaultContextType = {
    authenticated: false,
    event: {
        name: '',
        id: ''
    },
    userName: '',
    setLoggedInDetails: (username:string,  jwt?: string, eventName?:string) => {},
    loginRequest: (userName:string, password:string) => {},
    logoutRequest: () => {},
    endpoint: '',
    notifications: [
        {message: "Looks like this is the first time you're here since an update, Welcome =)", level: NoticeLevel.Good},
        {message: "This site is in development - please use at own risk", level: NoticeLevel.Warning}
        ],
    addNotifications: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;