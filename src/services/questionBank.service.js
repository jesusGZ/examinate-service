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
};
