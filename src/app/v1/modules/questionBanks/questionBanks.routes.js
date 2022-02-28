const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const question_bank_controller = require('./questionBank.controller');
const question_bank_schema = require('./questionBank.schema');
const authJWT = require('../../../../utils/auth');

module.exports = (router) => {
	router.delete('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank_del, 'body'), question_bank_controller.deleteQuestionBank);
	router.put('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank_up, 'body'), question_bank_controller.updateQuestionBank);
	router.post('/questionBank', authJWT, validateRequestMiddleware(question_bank_schema.questionBank, 'body'), question_bank_controller.createQuestionBank);
	router.get('/questionBank', authJWT, question_bank_controller.getQuestionBank);
};
