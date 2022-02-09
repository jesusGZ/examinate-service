const examinaterModel = require('../models/examinater.model');

async function getExaminer(examinerId) {
	const data = await examinaterModel.findOne({ _id: examinerId });
	return data;
}

module.exports = { getExaminer };
