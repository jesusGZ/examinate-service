const swagger_ui = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');

const examinate_service_v1 = require('../app/v1/docs');
const examinate_service_v2 = require('../app/v1/docs');
const { SWAGGER } = require('../configs');

let options = {};
const auth = basicAuth({ authorizer: swaggerAuthorizer, challenge: true });

function swaggerAuthorizer(username, password) {
	const password_matches = basicAuth.safeCompare(password, SWAGGER.SWAGGER_PASS);
	const user_matches = basicAuth.safeCompare(username, SWAGGER.SWAGGER_USER);
	return user_matches & password_matches;
}

module.exports = (app) => {
	app.use('/document-apis/v1', auth, swagger_ui.serveFiles(examinate_service_v1, options), swagger_ui.setup(examinate_service_v1));
	app.use('/document-apis/v2', auth, swagger_ui.serveFiles(examinate_service_v2, options), swagger_ui.setup(examinate_service_v2));
};
