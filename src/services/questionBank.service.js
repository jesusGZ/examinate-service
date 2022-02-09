const examinaterModel = require('../models/examinater.model');

async function getFoundElements(user) {
	const data = await examinaterModel.findOne({ user: user }, { exams: 0, classes: 0, password: 0 });
	return data;
}

async function insertQuestionBank(user, questionBankName) {
	const data = await examinaterModel.findOneAndUpdate({ user: user }, { $addToSet: { questionBanks: { questionBankName: questionBankName } } });
	return data;
}

async function updateQuestionBank(user, id, questionBankName, questions) {
	const updatedQuestionBank = { _id: id, questionBankName: questionBankName, questions: questions };

	const data = await examinaterModel.findOneAndUpdate({ user: user, 'questionBanks._id': id }, { $set: { 'questionBanks.$': updatedQuestionBank } });
	return data;
}

async function deleteQuestionBank(user, questionBankId) {
	const data = await examinaterModel.findOneAndUpdate({ user: user }, { $pull: { questionBanks: { _id: questionBankId } } });
	return data;
}

async function getQuestionBankNameByUser(user, questionBankName) {
	let data = await examinaterModel.findOne({ user: user, 'questionBanks.questionBankName': questionBankName });
	if (data) data = data.toObject();
	return data;
}

async function getQuestionBankByUserAndId(user, questionBankId) {
	let data = await examinaterModel.findOne({ user: user, 'questionBanks._id': questionBankId });
	if (data) data = data.toObject();
	return data;
}

module.exports = { getFoundElements, insertQuestionBank, updateQuestionBank, deleteQuestionBank, getQuestionBankNameByUser, getQuestionBankByUserAndId };
