const examinaterModel = require('../models/examinater.model');

module.exports = class ExamLiveService {
	async getExaminer(examinerId) {
		const data = await examinaterModel.findOne({ _id: examinerId });
		return data;
	}
};
