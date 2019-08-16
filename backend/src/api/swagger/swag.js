const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {Router} = require('express');

const router = Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const AttachSwagger = (app) => {
    app.use('/doc', router);
    app.use('/docs', router);
    app.use('/api-docs', router);
    app.use('/api-doc', router);
};

module.exports = AttachSwagger;
