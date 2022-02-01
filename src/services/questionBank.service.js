const examinaterModel = require('../models/examinater.model');

module.exports = class QuestionBankService {
	async getFoundElements(user) {
		const data = await examinaterModel.findOne({ user: user });
		return data;
	}

	async insertQuestionBank(user, questionBankName) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $addToSet: { questionBanks: { questionBankName: questionBankName } } });
		return data;
	}

	async updateQuestionBank(user, updatedQuestionBank) {
		const data = await examinaterModel.findOneAndUpdate({ user: user, 'questionBanks._id': updatedQuestionBank._id }, { $set: { 'questionBanks.$': updatedQuestionBank } });
		return data;
	}

	async deleteQuestionBank(user, questionBankId) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $pull: { questionBanks: { _id: questionBankId } } });
		return data;
	}

	async getQuestionBankNameByUser(user, questionBankName) {
		let data = await examinaterModel.findOne({ user: user, 'questionBanks.questionBankName': questionBankName });
		if (data) data = data.toObject();
		return data;
	}
};
