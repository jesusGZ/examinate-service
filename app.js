const express = require('express');
const morgan = require('morgan');
const swagger_ui = require('swagger-ui-express');
const compression = require('compression');

const methods_http = require('./src/helpers/middleware/methodsHttp');
const { RouteV1, RouteV2 } = require('./src/routes/index.routes');
const RouteDefault = require('./src/routes/default/index.routes');
const { SERVICE, SWAGGER } = require('./src/configs/index');
const error = require('./src/helpers/middleware/error');
const DB = require('./src/configs/db/connection');
const swagger_doc = require('./src/app/v1/Docs');

const https = require('https');
const http = require('http');
const app = express();
const router = express.Router();

DB.getConnection().catch((err) => {
	console.error('[Error db]: ' + err);
});

app.disable('x-powered-by');
app.use(methods_http);
app.use(morgan('dev'));
app.use(compression());
app.use(express.json({ limit: '500kb', extended: true }));
app.use(express.urlencoded({ limit: '500kb', extended: true }));

const basicAuth = require('express-basic-auth');

app.use('/document-apis', basicAuth({ authorizer: swaggerAuthorizer, challenge: true }), swagger_ui.serve, swagger_ui.setup(swagger_doc));

function swaggerAuthorizer(username, password) {
	const user_matches = basicAuth.safeCompare(username, SWAGGER.SWAGGER_USER);
	const password_matches = basicAuth.safeCompare(password, SWAGGER.SWAGGER_PASS);
	return user_matches & password_matches;
}

RouteV1(app, router, '/api/v1');
RouteV2(app, router, '/api/v2');
RouteDefault(app);
app.use(error);

http.createServer(/* options, */ app).listen(SERVICE.LOCAL_PORT, () => {
	console.log('[HTTP] El servidor esta escuchando en el puerto: ' + SERVICE.LOCAL_PORT + '...');
});
