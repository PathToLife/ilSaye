const axios = require('axios');

// Validate auth was generated for our app, not some other app
const APP_CONTEXT = '495410337391-l6eu5s4fpk4228k7e2td9supfosnmhb0.apps.googleusercontent.com';

const validateToken = (token) => {
    return new Promise((resolve, rej) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
            .then(res => {
                try {
                    if (res.status === 200) {
                        const data = res.data;
                        if (data.issued_to && data.issued_to === APP_CONTEXT) {
                            resolve({
                                email: data.email,
                                verified_email: data.verified_email,
                                expires_in: data.expires_in
                            });
                            return;
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