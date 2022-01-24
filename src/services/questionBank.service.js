const examinaterModel = require('../models/examinater.model');

module.exports = class QuestionBankService {
	async getFoundElements(username) {
		const data = await examinaterModel.findOne({ username: username });
		return data;
	}

	async insertQuestionBank(username, question_bank) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $addToSet: { questionBanks: question_bank } });
		return data;
	}

	async updateQuestionBank(username, updatedQuestionBank) {
		const data = await examinaterModel.findOneAndUpdate({ username: username, 'questionBanks._id': updatedQuestionBank._id }, { $set: { 'questionBanks.$': updatedQuestionBank } });
		return data;
	}

	async deleteQuestionBank(username, questionBankId) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $pull: { questionBanks: { _id: questionBankId } } });
		return data;
	}
};
