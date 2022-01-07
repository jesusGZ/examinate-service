const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: Schema.Types.ObjectId,
	nombre: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	direccion: { type: String, required: false },
	telefono: [
		{
			fijo: { type: String, unique: true, required: false },
			movil: { type: String, unique: true, required: false },
		},
	],
	cv_uri: { type: String, unique: true, required: false },
	user: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	activo: { type: Boolean, default: true, required: false },
});

module.exports = mongoose.model('User', userSchema);
