const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const https = require('https');
const http = require('http');

const methods_http = require('./src/helpers/middleware/methodsHttp');
const { RouteV1, RouteV2 } = require('./src/routes/index.routes');
const RouteDefault = require('./src/routes/default.routes');
const { SERVICE } = require('./src/configs/index');
const DB = require('./src/configs/db/connection');
const swaggers = require('./src/docs/index');

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
app.use(helmet());

swaggers(app);
RouteV1(app, router, '/api/v1');
RouteV2(app, router, '/api/v2');
RouteDefault(app);

http.createServer(/* options, */ app).listen(SERVICE.LOCAL_PORT, () => {
	console.log('[HTTP] The server is listening on the port: ' + SERVICE.LOCAL_PORT + '...');
});
