const user_schema = require('./user.schema');
const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const user_controller = require('./user.controller');
const authJWT = require('../../../../utils/auth');
const response = require('../../../../helpers/serviceResponse');

module.exports = (router) => {
	router.post('/user', authJWT, validateRequestMiddleware(user_schema.user, 'body'), user_controller.createUser);

	router.get('/user', authJWT, validateRequestMiddleware(user_schema.id, 'headers'), user_controller.getUser);

	router.get('/users', authJWT, user_controller.getUsers);

	router.put('/user', authJWT, validateRequestMiddleware(user_schema.user_up, 'body'), validateRequestMiddleware(user_schema.id, 'headers'), user_controller.updateUser);

	router.put('/user/resetPassword', validateRequestMiddleware(user_schema.reset_password, 'body'), user_controller.resetPassword);

	router.post('/user/login', validateRequestMiddleware(user_schema.login, 'body'), user_controller.login);
};
