const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examiner_schema = new Schema({
	user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	exams: [
		{
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
