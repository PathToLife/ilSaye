import React, {useContext} from "react";
import AppContext from "../../context/AppContext";
import GoogleLogin from "react-google-login";
import axios from "axios";



const GoogleLoginButton: React.FC = () => {

    const appContext = useContext(AppContext);

    const responseGoogleOk = (res: any) => {
        axios.post(`${appContext.endpoint}/api/v1/logingoogle?token=${res.accessToken}`)
            .then(res => {
                if (res.status === 200) {
                    appContext.setLoggedInDetails(res.data.username, res.data.jwt);
                }
            })
            .catch(e => console.log(e));
    };

    const responseGoogleErr = (res: any) => {
        console.log(`Error ${res}`);
    };

    return (
        <GoogleLogin
            clientId="495410337391-l6eu5s4fpk4228k7e2td9supfosnmhb0.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogleOk}
            onFailure={responseGoogleErr}
            cookiePolicy={'single_host_origin'}
        />
    )
};

export default GoogleLoginButton;