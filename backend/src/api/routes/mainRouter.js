const router = require('express').Router();

const authRoute = require('./handlers/authRoute');
const privateRoute = require('./handlers/privateRoute');
const publicRoute = require('./handlers/publicRoute');

const API_VERSION_PATH = '/v1';
router.use(API_VERSION_PATH, authRoute);
router.use(API_VERSION_PATH, privateRoute);
router.use(API_VERSION_PATH, publicRoute);

module.exports = router;