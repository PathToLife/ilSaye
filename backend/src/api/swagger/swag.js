const swaggerUi = require('swagger-ui-express');
const {Router} = require('express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname,'swagger.yaml'));
const version = swaggerDocument.info.version;
const router = Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const AttachSwagger = (app) => {
    app.use('/doc', router);
    app.use('/docs', router);
    app.use('/api-docs', router);
    app.use('/api-doc', router);
};

module.exports = {AttachSwagger, version};
