const exam_live_schema = require('./examlive.schema');
const validateRequestMiddleware = require('../../../../../helpers/middleware/validateRequest');
const exam_live_controller = require('./examlive.controller');

module.exports = (router) => {
	router.get('/examlive', validateRequestMiddleware(exam_live_schema.examLive, 'body'), async (req, res, next) => {
		try {
			const { examinerId, examId, candidateId, candidatePassword } = req.body;

			const result = await exam_live_controller.getExamLive({ examinerId, examId, candidateId, candidatePassword });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	router.post('/examlive/result', validateRequestMiddleware(exam_live_schema.examLiveResults, 'body'), async (req, res, next) => {
		try {
			const { examinerId, examId, candidateId, candidatePassword, responses } = req.body;

			const result = await exam_live_controller.getResultsExam({ examinerId, examId, candidateId, candidatePassword, responses });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
