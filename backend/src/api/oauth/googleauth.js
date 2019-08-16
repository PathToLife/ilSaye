const axios = require('axios');

// Validate auth was generated for our app, not some other app
const APP_CONTEXT = '495410337391-l6eu5s4fpk4228k7e2td9supfosnmhb0.apps.googleusercontent.com';

const validateToken = (token) => {
    return new Promise( (res, rej) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(res => {
                try {
                    if (res.statusCode === 200) {
                        const userObj = JSON.parse(data);

                        if (userObj.issued_to && userObj.issued_to === APP_CONTEXT) {
                            return {
                                email: userObj.email,
                                verified_email: userObj.verified_email,
                                expires_in: userObj.expires_in
                            }
                        }
                    }
                    rej(res.statusCode)
                } catch (e) {
                    rej(e)
                }
            })
            .catch(err => rej(err));
    })
};

module.exports = {
    validateToken
};