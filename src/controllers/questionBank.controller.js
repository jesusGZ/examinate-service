const QUESTION_BANK_SERVICE = require('../services/questionBank.service');
const logger = require('../utils/logger');

module.exports = class QuestionBankProcess {
	createQuestionBank(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const question_bank_service = new QUESTION_BANK_SERVICE();

				let question_bank_data = await question_bank_service.getQuestionBankNameByUser(data.user, data.questionBankName);
				if (question_bank_data) return reject('El banco de preguntas ya se encuentra registrado.');

				await question_bank_service.insertQuestionBank(data.user, data.questionBankName);

				const found_element = await question_bank_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element.questionBanks, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	getQuestionBank(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const question_bank_service = new QUESTION_BANK_SERVICE();

				const found_element = await question_bank_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element.questionBanks, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	updateQuestionBank(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const question_bank_service = new QUESTION_BANK_SERVICE();

				await question_bank_service.updateQuestionBank(data.user, data.updatedQuestionBank);

				const found_element = await question_bank_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	deleteQuestionBank(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const question_bank_service = new QUESTION_BANK_SERVICE();

				await question_bank_service.deleteQuestionBank(data.user, data.questionBankId);

				const found_element = await question_bank_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}
};
