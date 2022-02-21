const class_schema = require('../core/validators/schemas/class.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const class_controller = require('../controllers/class.controller');
const authJWT = require('../utils/auth');

module.exports = (app) => {
	app.post('/class', authJWT, validateRequestMiddleware(class_schema.classes, 'body'), async (req, res, next) => {
		try {
			const class_name = req.body.className;
			const user = req.payload.user;

			const result = await class_controller.createClass({ user, class_name });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/class', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await class_controller.getClass(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put('/class', authJWT, validateRequestMiddleware(class_schema.classes_up, 'body'), async (req, res, next) => {
		try {
			const { id, className, candidates } = req.body;
			const user = req.payload.user;

			const result = await class_controller.updateClass({ user, id, className, candidates });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete('/class', authJWT, validateRequestMiddleware(class_schema.classes_del, 'body'), async (req, res, next) => {
		try {
			const classId = req.body.classId;
			const user = req.payload.user;

			const result = await class_controller.deleteClass({ user, classId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
