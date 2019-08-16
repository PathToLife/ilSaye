import React from "react";



export const defaultContext = {
    authenticated: false,
    event: {
        name: '',
        id: ''
    },
    userName: '',
    login: (userName:string, password:string) => {},
    logout: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;