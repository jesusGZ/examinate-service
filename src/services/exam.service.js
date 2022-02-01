const examinaterModel = require('../models/examinater.model');

module.exports = class ExamService {
	async insertExam(data) {
		const new_user = await new userModel(data);
		await new_user.save();
		return new_user;
	}

	async getFoundElement(user, classId) {
		const data = await examinaterModel.findOne({ user: user, 'classes._id': classId });
		return data;
	}

	async getFoundElements(user) {
		const data = await examinaterModel.findOne({ user: user });
		return data;
	}

	async updateExam(user, compiledObjectExam) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $addToSet: { exams: compiledObjectExam } });
		return data;
	}

	async deleteExam(user, examId) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $pull: { exams: { _id: examId } } });
		return data;
	}
};
