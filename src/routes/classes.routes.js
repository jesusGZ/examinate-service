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
			const class_name = req.body.class;
			const username = req.payload.username;

			const result = await class_controller.createClass({ username, class_name });
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
			const username = req.payload.username;

			const result = await class_controller.getClass(username);
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
			const username = req.payload.username;

			const result = await class_controller.updateClass({ username, updatedClass });
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
			const username = req.payload.username;

			const result = await class_controller.deleteClass({ username, classId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
