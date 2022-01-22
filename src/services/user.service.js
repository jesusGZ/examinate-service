const userModel = require('../models/user.model');

module.exports = class UserService {
	async insertUser(data) {
		const new_user = await new userModel(data);
		await new_user.save();
		return new_user;
	}

	async updateUser(data) {
		const id = data.id;
		delete data.id;
		const result = await userModel.updateOne({ _id: id }, data);
		return result;
	}

	async updateUserPassword(user, password) {
		const result = await userModel.updateOne({ _id: user._id }, { password: password });
		return result;
	}

	async getEmail(email) {
		let data = await userModel.findOne({ email: email });
		if (data) data = data.toObject();
		return data;
	}

	async getEmailDistincId(email, id) {
		let data = await userModel.findOne({ email: email, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getTelefonoMovilDistincId(telefono_movil, id) {
		let data = await userModel.findOne({ 'telefono.movil': telefono_movil, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getTelefonoFijoDistincId(telefono_fijo, id) {
		let data = await userModel.findOne({ 'telefono.fijo': telefono_fijo, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getCvUriDistincId(cv_uri, id) {
		let data = await userModel.findOne({ cv_uri: cv_uri, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getUser(user) {
		let data = await userModel.findOne({ user: user });
		if (data) data = data.toObject();
		return data;
	}

	async getUserById(id) {
		let data = await userModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getAllUsers() {
		const data = userModel.find();
		return data;
	}

	async getUserDistincId(user, id) {
		let data = await userModel.findOne({ user: user, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getNameDistincId(name, id) {
		let data = await userModel.findOne({ nombre: name, _id: { $ne: id } });
		if (data) data = data.toObject();
		return data;
	}

	async getAll() {
		const users = await userModel.aggregate([{ $project: { password: 0 } }]);
		return users;
	}

	async getCredentials(user, password) {
		const data = await userModel.find({ user: user, password: password });
		return data;
	}

	async getPasswordAuth(id) {
		let data = await userModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getDataKey(id) {
		let data = await userModel.findOne({ _id: id });
		if (data) data = data.toObject();
		return data;
	}

	async getPasswordById(id) {
		let data = await userModel.findOne({ _id: id }, 'password');
		if (data) data = data.toObject();
		return data;
	}

	async getPasswordByUser(user) {
		let data = await userModel.findOne({ user: user }, 'password');
		if (data) data = data.toObject();
		return data;
	}
};
