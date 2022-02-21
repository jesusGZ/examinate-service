const examinerModel = require('../models/examiner.model');

async function getExaminer(examinerId) {
	const data = await examinerModel.findOne({ _id: examinerId });
	return data;
}

module.exports = { getExaminer };
