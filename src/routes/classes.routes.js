const class_schema = require('../core/validators/schemas/class.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const CLASS_CONTROLLER = require('../controllers/class.controller');
const authJWT = require('../utils/auth');

const class_controller = new CLASS_CONTROLLER();

module.exports = (app) => {
	// ========= CRUD for classes ============

	// --------- CREATE ----------

	// request format to add a class in the list of all classes:
	// req = {
	//      class: {
	//          className: String,
	//      }
	// }

	app.post('/class', authJWT, validateRequestMiddleware(class_schema.class, 'body'), async (req, res, next) => {
		try {
			const class_name = req.body.class;
			const username = req.payload.username;

			const result = await class_controller.createClass({ username, class_name });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	// --------- READ ----------

	// request format to get list of all classes:
	// only valid jwt

	app.get('/class', authJWT, async (req, res, next) => {
		try {
			const username = req.payload.username;

			const result = await class_controller.getClass(username);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
