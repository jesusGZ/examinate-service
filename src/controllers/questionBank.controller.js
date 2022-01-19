const QUESTION_BANK_SERVICE = require('../services/questionBank.service');
const logger = require('../utils/logger');

module.exports = class QuestionBankProcess {
	createQuestionBank(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const question_bank_service = new QUESTION_BANK_SERVICE();

				await question_bank_service.insertQuestionBank(data.username, data.question_bank);

				const found_element = await question_bank_service.getFoundElements(data.username);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: foundElement.questionBanks, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor');
			}
		});
	}
};
