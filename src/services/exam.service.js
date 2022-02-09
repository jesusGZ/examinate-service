const examinaterModel = require('../models/examinater.model');

async function insertExam(data) {
	const new_user = await new userModel(data);
	await new_user.save();
	return new_user;
}

async function getFoundElement(user, classId) {
	const data = await examinaterModel.findOne({ user: user, 'classes._id': classId });
	return data;
}

async function getFoundElements(user) {
	const data = await examinaterModel.findOne({ user: user }, { password: 0 });
	return data;
}

async function getExams(user) {
	const data = await examinaterModel.findOne({ user: user }, { exams: 1 });
	return data;
}

async function getExamById(user, examId) {
	const data = await examinaterModel.findOne({ user: user, 'exams._id': examId }, { exams: 1 });
	return data;
}

async function updateExam(user, compiledObjectExam) {
	const data = await examinaterModel.findOneAndUpdate({ user: user }, { $addToSet: { exams: compiledObjectExam } });
	return data;
}

async function deleteExam(user, examId) {
	const data = await examinaterModel.findOneAndUpdate({ user: user }, { $pull: { exams: { _id: examId } } });
	return data;
}

module.exports = { insertExam, getFoundElement, getFoundElements, getExams, getExamById, updateExam, deleteExam };
