const examinaterModel = require('../models/examinater.model');

module.exports = class UserService {
	async insertUser(data) {
		const new_user = await new examinaterModel(data);
		await new_user.save();
		return new_user;
	}

	async updateUser(data) {
		const id = data.id;
		delete data.id;
		const result = await examinaterModel.updateOne({ _id: id }, data);
		return result;
	}

	async updateUserPassword(user, password) {
		const result = await examinaterModel.updateOne({ _id: user._id }, { password: password });
		return result;
	}

	async getEmail(email) {
		let data = await examinaterModel.findOne({ email: email });
		if (data) data = data.toObject();
		return data;
	}

	async getEmailDistincId(email, id) {
		let data = await examinaterModel.findOne({ email: email, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getUser(user) {
		let data = await examinaterModel.findOne({ user: user });
		if (data) data = data.toObject();
		return data;
	}

	async getUserById(id) {
		let data = await examinaterModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getAllUsers() {
		const data = examinaterModel.find();
		return data;
	}

	async getUserDistincId(user, id) {
		let data = await examinaterModel.findOne({ user: user, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getNameDistincId(name, id) {
		let data = await examinaterModel.findOne({ name: name, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getAll() {
		const users = await examinaterModel.aggregate([{ $project: { password: 0 } }]);
		return users;
	}

	async getCredentials(user, password) {
		const data = await examinaterModel.find({ user: user, password: password });
		return data;
	}

	async getPasswordAuth(id) {
		let data = await examinaterModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getDataKey(id) {
		let data = await examinaterModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getPasswordById(id) {
		let data = await examinaterModel.findOne({ _id: id }, 'password');
		if (data) data = data.toObject();
		return data;
	}

	async getPasswordByUser(user) {
		let data = await examinaterModel.findOne({ user: user }, 'password');
		if (data) data = data.toObject();
		return data;
	}
};
