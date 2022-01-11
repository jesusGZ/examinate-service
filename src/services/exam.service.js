const examinaterModel = require('../models/examinater.model');

module.exports = class ExamService {
	async insertExam(data) {
		const new_user = await new userModel(data);
		await new_user.save();
		return new_user;
	}

	async getFoundElement(username, classId) {
		const data = await examinaterModel.findOne({ username: username, 'classes._id': classId });
		return data;
	}

	async getFoundElements(username) {
		const data = await examinaterModel.findOne({ username: username });
		return data;
	}

	async updateExam(username, compiledObjectExam) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $addToSet: { exams: compiledObjectExam } });
		return data;
	}
};
