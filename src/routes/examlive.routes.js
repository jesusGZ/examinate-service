const exam_schema = require('../core/validators/schemas/examlive.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const EXAM_LIVE_CONTROLLER = require('../controllers/examlive.controller');
const authJWT = require('../utils/auth');

const exam_live_controller = new EXAM_LIVE_CONTROLLER();

module.exports = (app) => {
	/* 
	 request format to get the list of questions and options:
	 req = {
	     examinerId: String,
	     examId: String,
	     candidateId: String,
	     candidatePassword: String,
	 } 
	 */

	app.get('/examlive', async (req, res, next) => {
		try {
			const { examinerId, examId, candidateId, candidatePassword } = req.body;
			const result = await exam_live_controller.getExamLive({ examinerId, examId, candidateId, candidatePassword });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
