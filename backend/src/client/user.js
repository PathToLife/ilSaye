const modelUser = require('../db/models/model_user');

const isUser = (username) => {
    modelUser.find({where: username}).then(data => {
        console.log(data);
    }).catch(e => throw(e));
};

const getUser = (username) => {

};

const authUser = (username, password) => {

};

module.exports = {
    isUser
};