const user_schema = require('../core/validators/schemas/user.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const USER_CONTROLLER = require('../controllers/user.controller');

const user_controller = new USER_CONTROLLER();

module.exports = (app) => {
	app.post('/user', validateRequestMiddleware(user_schema.user, 'body'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;
			const result = await user_controller.createUser({ name, email, user, password, active });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/user', validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { id } = req.headers;
			const result = await user_controller.obtenerUsuario(id);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/users', async (req, res, next) => {
		try {
			const result = await user_controller.obtenerUsuarios();
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put('/user', validateRequestMiddleware(user_schema.user_up, 'body'), validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { name, email, user, password, active } = req.body;
			const { id } = req.headers;
			const result = await user_controller.actualizarUsuario({ id, name, email, user, password, active });
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
};
