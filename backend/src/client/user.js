const modelUser = require('../db/models/model_user');

const query = (query) => {
    return new Promise((resolve, reject) => {
        modelUser.findOne(query).then(user => {
            if (user === null) {
                resolve(null)
            } else {
                resolve(user);
            }
        }).catch(e => {
            reject(e)
        });
    })
};

const getUserByUsername = (username) => {
    return query({where: {username: username}})
};

const getUserByEmail = (email) => {
    return query({where: {email: email}})
};

const getUser = (username) => {

};

const authUser = (username, password) => {

};

module.exports = {
    getUserByUsername, getUserByEmail
};