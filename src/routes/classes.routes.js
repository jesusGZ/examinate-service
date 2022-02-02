const class_schema = require('../core/validators/schemas/class.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const CLASS_CONTROLLER = require('../controllers/class.controller');
const authJWT = require('../utils/auth');

const class_controller = new CLASS_CONTROLLER();

module.exports = (app) => {
	/* 
	 --------- CREATE ----------
	 request format to add a class in the list of all classes:
	 req = {
	      class: {
	          className: String,
	      }
	 } 
	 */
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

	/* 
	 --------- READ ----------
	 request format to get list of all classes:
	 only valid jwt 
	 */

	app.get('/class', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await class_controller.getClass(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	/*
	 --------- UPDATE ----------
	 request format to update a class details:
	 req = {
	      updatedClass: {
	          _id: String
	          className: String,
	          candidates: [
	              {
	                  _id: String,
	                  candidateId: String,
	                  candidateName: String,
	                  candidateEmail: String
	              },
	              {
	                  candidateId: String,
	                  candidateName: String,
	                  candidateExam: String
	              },
	          ]
	      }
	 } 
	 */
	app.put('/class', authJWT, validateRequestMiddleware(class_schema.classes_up, 'body'), async (req, res, next) => {
		try {
			const updatedClass = req.body.updatedClass;
			const user = req.payload.user;

			const result = await class_controller.updateClass({ user, updatedClass });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	/* 
	 --------- DELETE ----------
	 request format to delete a class:
	 req = {
	      classId: Object ID (_Id)
	 } 
	 */

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
