const examinerModel = require('../models/examiner.model');

async function insertUser(data) {
	const new_user = await new examinerModel(data);
	await new_user.save();
	return new_user;
}

async function updateUser(data) {
	const id = data.id;
	delete data.id;
	const result = await examinerModel.updateOne({ _id: id }, data);
	return result;
}

async function updateUserPassword(user, password) {
	const result = await examinerModel.updateOne({ _id: user._id }, { password: password });
	return result;
}

async function getEmail(email) {
	let data = await examinerModel.findOne({ email: email });
	if (data) data = data.toObject();
	return data;
}

async function getEmailDistinctId(email, id) {
	let data = await examinerModel.findOne({ email: email, _id: { $ne: id } });
	if (data) data = data.toObject();
	return data;
}

async function getUser(user) {
	let data = await examinerModel.findOne({ user: user });
	if (data) data = data.toObject();
	return data;
}

async function getUserById(id) {
	let data = await examinerModel.findOne({ _id: id }, { exams: 0, classes: 0, questionBanks: 0, __v: 0 });
	if (data) data = data.toObject();
	return data;
}

async function getAllUsers() {
	const data = examinerModel.find();
	return data;
}

async function getUserDistinctId(user, id) {
	let data = await examinerModel.findOne({ user: user, _id: { $ne: id } });
	if (data) data = data.toObject();
	return data;
}

async function getNameDistinctId(name, id) {
	let data = await examinerModel.findOne({ name: name, _id: { $ne: id } });
	if (data) data = data.toObject();
	return data;
}

async function getAll() {
	const users = await examinerModel.aggregate([{ $project: { password: 0 } }]);
	return users;
}

async function getCredentials(user, password) {
	const data = await examinerModel.find({ user: user, password: password });
	return data;
}

async function getPasswordAuth(id) {
	let data = await examinerModel.findOne({ _id: id });
	if (data) data = data.toObject();
	return data;
}

async function getDataKey(id) {
	let data = await examinerModel.findOne({ _id: id });
	if (data) data = data.toObject();
	return data;
}

async function getPasswordById(id) {
	let data = await examinerModel.findOne({ _id: id }, 'password');
	if (data) data = data.toObject();
	return data;
}

async function getPasswordByUser(user) {
	let data = await examinerModel.findOne({ user: user }, 'password');
	if (data) data = data.toObject();
	return data;
}
module.exports = {
	updateUserPassword,
	getPasswordByUser,
	getEmailDistinctId,
	getUserDistinctId,
	getNameDistinctId,
	getPasswordAuth,
	getPasswordById,
	getCredentials,
	getUserById,
	getAllUsers,
	insertUser,
	getDataKey,
	updateUser,
	getEmail,
	getUser,
	getAll,
};
