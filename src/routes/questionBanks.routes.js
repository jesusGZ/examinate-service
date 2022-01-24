const question_bank_schema = require('../core/validators/schemas/questionBank.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const QUESTION_BANK_CONTROLLER = require('../controllers/questionBank.controller');
const authJWT = require('../utils/auth');

const question_bank_controller = new QUESTION_BANK_CONTROLLER();

module.exports = (app) => {
	/* 
    request format to add a questionBank in the list of all questionBanks:
	 req = {
	      questionBank: {
	          questionBankName: String,
	      }
	 } 
     */

	app.post('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank, 'body'), async (req, res, next) => {
		try {
			const question_bank = req.body.questionBank;
			const username = req.payload.username;

			const result = await question_bank_controller.createQuestionBank({ username, question_bank });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	// --------- READ ----------

	// request format to get list of all questionBanks:
	// only a valid jwt

	app.get('/questionBank', authJWT, async (req, res, next) => {
		try {
			const username = req.payload.username;

			const result = await question_bank_controller.getQuestionBank(username);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});
};
