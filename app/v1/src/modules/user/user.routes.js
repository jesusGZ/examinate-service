const user_schema = require('../core/validators/schemas/user.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const user_controller = require('./user.controller');
const authJWT = require('../utils/auth');

module.exports = (app) => {
	app.post('/user', authJWT, validateRequestMiddleware(user_schema.user, 'body'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;

			const result = await user_controller.createUser({ name, email, user, password, active });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/user', authJWT, validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { id } = req.headers;

			const result = await user_controller.getUser(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/users', authJWT, async (req, res, next) => {
		try {
			const result = await user_controller.getUsers();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put('/user', authJWT, validateRequestMiddleware(user_schema.user_up, 'body'), validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;
			const { id } = req.headers;

			const result = await user_controller.updateUser({ id, name, email, user, password, active });
			res.send(result);
		} catch (err) {
			next(err);
		}
	});

	app.put('/user/resetPassword', validateRequestMiddleware(user_schema.reset_password, 'body'), async (req, res, next) => {
		try {
			const { user, password, secret } = req.body;

			const result = await user_controller.resetPassword({ user, password, secret });
			res.send(result);
		} catch (err) {
			next(err);
		}
	});

	app.post('/user/login', validateRequestMiddleware(user_schema.login, 'body'), async function (req, res, next) {
		try {
			const { user, password } = req.body;
			console.log(user, password);
			const result = await user_controller.login({ user, password });
			res.send(result);
		} catch (err) {
			next(err);
		}
	});
};
