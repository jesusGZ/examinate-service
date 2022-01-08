const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: Schema.Types.ObjectId,
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	user: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	active: { type: Boolean, default: true, required: false },
});

module.exports = mongoose.model('User', userSchema);
