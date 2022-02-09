const question_bank_schema = require('../core/validators/schemas/questionBank.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const question_bank_controller = require('../controllers/questionBank.controller');
const authJWT = require('../utils/auth');

module.exports = (app) => {
	app.post('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank, 'body'), async (req, res, next) => {
		try {
			const questionBankName = req.body.questionBankName;
			const user = req.payload.user;

			const result = await question_bank_controller.createQuestionBank({ user, questionBankName });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.get('/questionBank', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await question_bank_controller.getQuestionBank(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.put('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank_up, 'body'), async (req, res, next) => {
		try {
			const { id, questionBankName, questions } = req.body;
			const user = req.payload.user;

			const result = await question_bank_controller.updateQuestionBank({ user, id, questionBankName, questions });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	app.delete('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank_del, 'body'), async (req, res, next) => {
		try {
			const questionBankId = req.body.questionBankId;
			const user = req.payload.user;

			const result = await question_bank_controller.deleteQuestionBank({ user, questionBankId });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
