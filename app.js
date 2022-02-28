const swagger_ui = require('swagger-ui-express');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const https = require('https');
const http = require('http');

const methods_http = require('./src/helpers/middleware/methodsHttp');
const { RouteV1, RouteV2 } = require('./src/routes/index.routes');
const RouteDefault = require('./src/routes/default.routes');
const { SERVICE, SWAGGER } = require('./src/configs/index');
const DB = require('./src/configs/db/connection');
const swagger_doc = require('./src/app/v1/Docs');

const router = express.Router();
const app = express();

DB.getConnection().catch((err) => {
	console.error('[Error db]: ' + err);
});

app.use(express.urlencoded({ limit: '500kb', extended: true }));
app.use(express.json({ limit: '500kb', extended: true }));
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(compression());
app.use(methods_http);

const basicAuth = require('express-basic-auth');
app.use('/document-apis', basicAuth({ authorizer: swaggerAuthorizer, challenge: true }), swagger_ui.serve, swagger_ui.setup(swagger_doc));

function swaggerAuthorizer(username, password) {
	const password_matches = basicAuth.safeCompare(password, SWAGGER.SWAGGER_PASS);
	const user_matches = basicAuth.safeCompare(username, SWAGGER.SWAGGER_USER);
	return user_matches & password_matches;
}

RouteV1(app, router, '/api/v1');
RouteV2(app, router, '/api/v2');
RouteDefault(app);

http.createServer(/* options, */ app).listen(SERVICE.LOCAL_PORT, () => {
	console.log('[HTTP] The server is listening on the port: ' + SERVICE.LOCAL_PORT + '...');
});
