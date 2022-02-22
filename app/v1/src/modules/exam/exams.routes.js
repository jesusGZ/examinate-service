const exam_schema = require('./exam.schema');
const validateRequestMiddleware = require('../../../../../helpers/middleware/validateRequest');
const exam_controller = require('./exam.controller');
const authJWT = require('../../../../../utils/auth');

module.exports = (app) => {
	app.post('/exam', authJWT, validateRequestMiddleware(exam_schema.exam, 'body'), async (req, res, next) => {
		try {
			const { examName, startDateTime, endDateTime, questionBankId, classId } = req.body;
			const user = req.payload.user;

			const result = await exam_controller.createExam({ user, examName, startDateTime, endDateTime, questionBankId, classId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/info', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await exam_controller.getInfo(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/exams', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await exam_controller.getExams(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete('/exam', authJWT, validateRequestMiddleware(exam_schema.examId, 'body'), async (req, res, next) => {
		try {
			const user = req.payload.user;
			const examId = req.body.examId;

			const result = await exam_controller.deleteExam({ user, examId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
