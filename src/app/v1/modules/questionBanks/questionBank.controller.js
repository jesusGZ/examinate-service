const question_bank_service = require('./questionBank.service');
const response = require('../../../../helpers/serviceResponse');
const logger = require('../../../../lib/winston');

async function createQuestionBank(req, res, next) {
	try {
		const questionBankName = req.body.questionBankName;
		const user = req.payload.user;

		let question_bank_data = await question_bank_service.getQuestionBankNameByUser(user, questionBankName);
		if (question_bank_data) return response.badRequest(res, 'The question bank is already registered.');

		await question_bank_service.insertQuestionBank(user, questionBankName);

		const found_element = await question_bank_service.getFoundElements(user);
		if (!found_element) return response.notFound(res, 'not found information');

		response.ok(res, found_element.questionBanks);
	} catch (error) {
		logger.errorLogger('Question Bank Module', error.message);
		response.internalServerError(res, error);
	}
}

async function getQuestionBank(req, res, next) {
	try {
		const user = req.payload.user;

		const found_element = await question_bank_service.getFoundElements(user);
		if (!found_element) return response.notFound(res, 'not found information');

		response.ok(res, found_element.questionBanks);
	} catch (error) {
		logger.errorLogger('Question Bank Module', error.message);
		response.internalServerError(res, error);
	}
}

async function updateQuestionBank(req, res, next) {
	try {
		const { id, questionBankName, questions } = req.body;
		const user = req.payload.user;

		let verify_question_bank = await question_bank_service.getQuestionBankByUserAndId(user, id);
		if (!verify_question_bank) return response.notFound(res, 'not found information');

		await question_bank_service.updateQuestionBank(user, id, questionBankName, questions);

		const found_element = await question_bank_service.getFoundElements(user);
		if (!found_element) return response.notFound(res, 'not found information');

		response.ok(res, found_element);
	} catch (error) {
		logger.errorLogger('Question Bank Module', error.message);
		response.internalServerError(res, error);
	}
}

async function deleteQuestionBank(req, res, next) {
	try {
		const questionBankId = req.body.questionBankId;
		const user = req.payload.user;

		const verify_question_bank = await question_bank_service.getQuestionBankByUserAndId(user, questionBankId);
		if (!verify_question_bank) return response.notFound(res, 'not found information');

		await question_bank_service.deleteQuestionBank(user, questionBankId);

		const found_element = await question_bank_service.getFoundElements(user);

		response.ok(res, found_element);
	} catch (error) {
		logger.errorLogger('Question Bank Module', error.message);
		response.internalServerError(res, error);
	}
}

module.exports = { deleteQuestionBank, updateQuestionBank, getQuestionBank, createQuestionBank };
