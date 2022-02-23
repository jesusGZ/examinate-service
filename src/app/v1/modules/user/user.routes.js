const user_schema = require('./user.schema');
const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const user_controller = require('./user.controller');
const authJWT = require('../../../../utils/auth');
const response = require('../../../../helpers/serviceResponse');

module.exports = (router) => {
	router.post('/user', authJWT, validateRequestMiddleware(user_schema.user, 'body'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;

			const { message, result } = await user_controller.createUser({ name, email, user, password, active });
			response.ok(res, message, result);
		} catch (error) {
			next(error);
		}
	});

	router.get('/user', authJWT, validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { id } = req.headers;

			const { message, result } = await user_controller.getUser(id);
			response.ok(res, message, result);
		} catch (error) {
			next(error);
		}
	});

	router.get('/users', authJWT, async (req, res, next) => {
		try {
			const { message, result } = await user_controller.getUsers();
			response.ok(res, message, result);
		} catch (error) {
			next(error);
		}
	});

	router.put('/user', authJWT, validateRequestMiddleware(user_schema.user_up, 'body'), validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;
			const { id } = req.headers;

			const { message, result } = await user_controller.updateUser({ id, name, email, user, password, active });
			response.ok(res, message, result);
		} catch (err) {
			next(err);
		}
	});

	router.put('/user/resetPassword', validateRequestMiddleware(user_schema.reset_password, 'body'), async (req, res, next) => {
		try {
			const { user, password, secret } = req.body;

			const { message } = await user_controller.resetPassword({ user, password, secret });
			response.ok(res, message);
		} catch (err) {
			next(err);
		}
	});

	router.post('/user/login', validateRequestMiddleware(user_schema.login, 'body'), async function (req, res, next) {
		try {
			const { user, password } = req.body;

			const { message, result } = await user_controller.login({ user, password });
			console.log(message, result);
			response.ok(res, message, result);
		} catch (err) {
			next(err);
		}
	});
};
