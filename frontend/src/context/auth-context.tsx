import React from "react";

const AuthContext = React.createContext({
    authenticated: false,
    userName: '',
    login: (userName:string, password:string) => {},
    logout: () => {}
});

export default AuthContext;