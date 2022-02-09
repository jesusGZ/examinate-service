const question_bank_service = require('../services/questionBank.service');
const logger = require('../utils/logger');

function createQuestionBank(data) {
	return new Promise(async (resolve, reject) => {
		try {
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

function getQuestionBank(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const found_element = await question_bank_service.getFoundElements(user);
			if (!found_element) return reject('No se encontro informacion');

			resolve({ status: 'success', data: found_element.questionBanks, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

function updateQuestionBank(data) {
	return new Promise(async (resolve, reject) => {
		try {
			let verify_question_bank = await question_bank_service.getQuestionBankByUserAndId(data.user, data.id);
			if (!verify_question_bank) return reject('No se encontro informacion.');

			await question_bank_service.updateQuestionBank(data.user, data.id, data.questionBankName, data.questions);

			const found_element = await question_bank_service.getFoundElements(data.user);
			if (!found_element) return reject('No se encontro informacion.');

			resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			console.log(error);
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

function deleteQuestionBank(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const verify_question_bank = await question_bank_service.getQuestionBankByUserAndId(data.user, data.questionBankId);
			if (!verify_question_bank) return reject('No se encontro informacion');

			await question_bank_service.deleteQuestionBank(data.user, data.questionBankId);

			const found_element = await question_bank_service.getFoundElements(data.user);

			resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

module.exports = { deleteQuestionBank, updateQuestionBank, getQuestionBank, createQuestionBank };
