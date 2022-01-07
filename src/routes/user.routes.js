const user_schema = require('../core/validators/schemas/user.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const USER_CONTROLLER = require('../controllers/user.controller');

const user_controller = new USER_CONTROLLER();

module.exports = (app) => {
	app.post('/user', validateRequestMiddleware(user_schema.usuario, 'body'), async (req, res, next) => {
		try {
			const { nombre, email, user, password, activo } = req.body;
			const result = await user_controller.crearUsuario({ nombre, email, user, password, activo });
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

	app.put('/user', validateRequestMiddleware(user_schema.usuario_up, 'body'), validateRequestMiddleware(user_schema.id, 'headers'), async (req, res, next) => {
		try {
			const { nombre, email, user, password, activo } = req.body;
			const { id } = req.headers;
			const result = await user_controller.actualizarUsuario({ id, nombre, email, user, password, activo });
			res.send(result);
		} catch (err) {
			next(err);
		}
	});

	app.put('/user/cambiarPassword', validateRequestMiddleware(user_schema.cambiarPassword, 'body'), async (req, res, next) => {
		try {
			const { user, password, secret } = req.body;
			const result = await user_controller.cambiarPassword({ user, password, secret });
			res.send(result);
		} catch (err) {
			next(err);
		}
	});
};
