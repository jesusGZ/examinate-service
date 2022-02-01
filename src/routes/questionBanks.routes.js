const question_bank_schema = require('../core/validators/schemas/questionBank.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const QUESTION_BANK_CONTROLLER = require('../controllers/questionBank.controller');
const authJWT = require('../utils/auth');

const question_bank_controller = new QUESTION_BANK_CONTROLLER();

module.exports = (app) => {
	/* 
    request format to add a questionBank in the list of all questionBanks:
	 req = {
	        	questionBankName: String,
	 		} 
     */

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

	/*  
	--------- READ ----------

	 request format to get list of all questionBanks:
	 only a valid jwt 
	 */

	app.get('/questionBank', authJWT, async (req, res, next) => {
		try {
			const user = req.payload.user;

			const result = await question_bank_controller.getQuestionBank(user);
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	/* 
	 --------- UPDATE ----------

	 request format to update a class details:
	 req = {
		"id": Object ID (_Id),
		"questionBankName": "Test2",
		"questions": [
			{
				"marks": "Number",
				"value": "String",
				"options": [{
						"value": "String"
					},{
						"value": "String"
					},{
						"value": "String"
					},{
						"value": "String"
					}],
				"correctOptionValue": "String"
			}
		]
	} 
	 */

	app.put('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank_up, 'body'), async (req, res, next) => {
		try {
			const { id, questionBankName, questions } = req.body;
			const user = req.payload.user;

			// Cambiar la forma de validar questions
			/* if (questions == undefined || questions == null || questions == '' || questions.length != 4) throw 'Error de petición.';

			if (questions.marks == undefined || questions.marks == null || questions.marks == '') throw 'Error de petición.';

			if (questions.value == undefined || questions.value == null || questions.value == '') throw 'Error de petición.';

			if (questions.correctOptionValue == undefined || questions.correctOptionValue == null || questions.correctOptionValue == '') throw 'Error de petición.';

			if (questions.options == undefined || questions.options == null || questions.options == '') throw 'Error de petición.'; */

			const result = await question_bank_controller.updateQuestionBank({ user, id, questionBankName, questions });
			res.send(result);
		} catch (error) {
			next(error);
		}
	});

	/*  
	--------- DELETE ----------

	 request format to delete a class:
	 req = {
	      questionBankId: Object ID (_Id)
	 } 
	 */

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
