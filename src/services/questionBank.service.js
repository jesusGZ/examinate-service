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

	async updateClass(username, updatedClass) {
		const data = await examinaterModel.findOneAndUpdate({ username: username, 'classes._id': updatedClass._id }, { $set: { 'classes.$': updatedClass } });
		return data;
	}

	async deleteClass(username, classId) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $pull: { classes: { _id: classId } } });
		return data;
	}
};
