const express = require('express');
const morgan = require('morgan');
const swagger_ui = require('swagger-ui-express');
const compression = require('compression');

const methods_http = require('./src/core/middlewares/methodsHttp');
const { SERVICE, SWAGGER } = require('./src/core/config/index');
const error = require('./src/core/middlewares/error');
const DB = require('./src/core/db/connection');
const swagger_doc = require('./Docs');

const https = require('https');
const http = require('http');
const app = express();

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

/* app.use(
	'/document-apis',
	basicAuth({
		users: { SWAGGER.SWAGGER_USER: SWAGGER.SWAGGER_PASS },
		challenge: true,
		realm: 'Imb4T3st4pp',
	}),
	swagger_ui.serve,
	swagger_ui.setup(swagger_doc)
);

app.use('/document-apis', swagger_ui.serve, swagger_ui.setup(swagger_doc)); */

app.use('/document-apis', basicAuth({ authorizer: swaggerAuthorizer, challenge: true }), swagger_ui.serve, swagger_ui.setup(swagger_doc));

function swaggerAuthorizer(username, password) {
	const user_matches = basicAuth.safeCompare(username, SWAGGER.SWAGGER_USER);
	const password_matches = basicAuth.safeCompare(password, SWAGGER.SWAGGER_PASS);
	return user_matches & password_matches;
}

require('./src/routes/index.routes')(app);
require('./src/routes/default/index.routes')(app);
app.use(error);

http.createServer(/* options, */ app).listen(SERVICE.LOCAL_PORT, () => {
	console.log('[HTTP] El servidor esta escuchando en el puerto: ' + SERVICE.LOCAL_PORT + '...');
});
