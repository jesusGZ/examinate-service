const exam_schema = require('../core/validators/schemas/exam.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const EXAM_CONTROLLER = require('../controllers/exam.controller');
const authJWT = require('../utils/auth');

const exam_controller = new EXAM_CONTROLLER();

module.exports = (app) => {
	// ========= CRUD for exams ============

	// --------- CREATE ----------

	// request format to add a exam in the list of all exams:
	// req.body = {
	//     newExam: {
	//         examName: String,
	//         startDateTime: Date,
	//         endDateTime: Date,
	//         questionBankId: String,
	//         classId: String,
	//     }
	// }

	app.post('/exam', authJWT, validateRequestMiddleware(exam_schema.exam, 'body'), async (req, res, next) => {
		try {
			const { examName, startDateTime, endDateTime, questionBankId, classId } = req.body.newExam;
			const username = req.payload.username;

			const result = await exam_controller.createExam({ username, examName, startDateTime, endDateTime, questionBankId, classId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	// --------- READ ----------

	// request format to get list of all exams:
	// only a valid jwt

	//for exams since we need all the user details to create an exam therefore this endpoint
	app.get('/info', authJWT, async (req, res, next) => {
		try {
			const username = req.payload.username;

			const result = await exam_controller.getInfo(username);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	// --------- READ ----------

	// request format to get list of all exams:
	// only a valid jwt

	//for exams since we need all the user details to create an exam therefore this endpoint
	app.get('/exams', authJWT, async (req, res, next) => {
		try {
			const username = req.payload.username;

			const result = await exam_controller.getExams(username);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
