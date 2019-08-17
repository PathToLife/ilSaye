import React, {Dispatch, SetStateAction} from "react";
import {NoticeLevel, NoticeType} from "../components/Notifications/Notice";

export {NoticeLevel} from "../components/Notifications/Notice"; // Re-export here for ease of import around the place

interface defaultContextType {
    authenticated: boolean,
    event: {name: string, id:string},
    userName: string,
    login: (username:string, password:string) => any,
    logout: () => any,
    endpoint: string,
    notifications: NoticeType[],
    setNotifications: Dispatch<SetStateAction<any>>;
}

export const defaultContext: defaultContextType = {
    authenticated: false,
    event: {
        name: '',
        id: ''
    },
    userName: '',
    login: (userName:string, password:string) => {},
    logout: () => {},
    endpoint: '',
    notifications: [
        {message: "Looks like this is the first time you're here since an update, Welcome =)", level: NoticeLevel.Good},
        {message: "This site is in development - please use at own risk", level: NoticeLevel.Warning}
        ],
    setNotifications: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;