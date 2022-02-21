const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examiner_schema = new Schema({
	id: Schema.Types.ObjectId,
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	user: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	active: { type: Boolean, default: true, required: false },
	exams: [
		{
			id: Schema.Types.ObjectId,
			examName: String,
			startDateTime: Date,
			endDateTime: Date,
			totalMarks: Number,
			questionBankId: String,
			candidates: [
				{
					candidateId: String,
					candidateName: String,
					candidatePassword: String,
					hasAppeared: Boolean,
					marks: Number,
					responses: [
						{
							questionId: String,
							optionId: String,
						},
					],
				},
			],
		},
	],
	classes: [
		{
			id: Schema.Types.ObjectId,
			className: String,
			candidates: [
				{
					candidateId: String,
					candidateName: String,
					candidateEmail: String,
				},
			],
		},
	],
	questionBanks: [
		{
			id: Schema.Types.ObjectId,
			questionBankName: String,
			questions: [
				{
					marks: Number,
					value: String,
					options: [{ value: String }],
					correctOptionValue: String,
				},
			],
		},
	],
});

module.exports = mongoose.model('Examiner', examiner_schema);
