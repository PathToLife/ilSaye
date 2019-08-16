const modelUser = require('../db/models/model_user');

const isUser = (username) => {
    modelUser.findOne({
        where: {username: username}
    }).then(data => {
        console.log(data);
    }).catch(e => {throw Error(e)});
};

const getUser = (username) => {

};

const authUser = (username, password) => {

};

module.exports = {
    isUser
};

isUser('hi');