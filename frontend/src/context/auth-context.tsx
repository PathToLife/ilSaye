import React from "react";

const AuthContext = React.createContext({
    authenticated: false,
    login: (userName:string, password:string) => {},
    logout: () => {}
});

export default AuthContext;