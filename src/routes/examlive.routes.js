const exam_live_schema = require('../core/validators/schemas/examlive.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const { getExamLive, getResultsExam } = require('../controllers/examlive.controller');

module.exports = (app) => {
	app.get('/examlive', validateRequestMiddleware(exam_live_schema.examLive, 'body'), async (req, res, next) => {
		try {
			const { examinerId, examId, candidateId, candidatePassword } = req.body;
			const result = await getExamLive({ examinerId, examId, candidateId, candidatePassword });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.post('/examlive/result', validateRequestMiddleware(exam_live_schema.examLiveResults, 'body'), async (req, res, next) => {
		try {
			const { examinerId, examId, candidateId, candidatePassword, responses } = req.body;
			const result = await getResultsExam({ examinerId, examId, candidateId, candidatePassword, responses });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
