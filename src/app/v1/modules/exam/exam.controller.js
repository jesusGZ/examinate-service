const response = require('../../../../helpers/serviceResponse');
const logger = require('../../../../lib/winston');
const { EMAIL } = require('../../../../configs');
const exam_service = require('./exam.service');

const moment = require('moment');
const mailjet = require('node-mailjet').connect(EMAIL.MAILJET_API_KEY, EMAIL.MAILJET_API_SECRET);

async function createExam(req, res, next) {
	try {
		const { examName, startDateTime, endDateTime, questionBankId, classId } = req.body;
		const user = req.payload.user;

		const found_element = await exam_service.getFoundElement(user, classId);
		if (!found_element) return response.notFound(res, 'not found information');

		// checking if the exam with the same name already exists
		if (found_element.exams.find((e) => e.examName === examName) !== undefined) {
			return response.badRequest(res, 'Exam name already exists.');
		}

		const class_indx = found_element.classes.findIndex((e) => {
			return e._id.toString() === classId;
		});

		if (class_indx < 0) return response.notFound(res, 'not found information');

		var compiled_total_marks = 0;

		const question_bank_indx = found_element.questionBanks.findIndex((e) => {
			return e._id.toString() === questionBankId;
		});

		if (question_bank_indx < 0) return response.notFound(res, 'not found information');

		found_element.questionBanks[question_bank_indx].questions.forEach((element) => {
			compiled_total_marks += element.marks;
		});

		var compiled_candidates = [];

		found_element.classes[class_indx].candidates.forEach((element) => {
			const random_password = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 8);

			compiled_candidates.push({
				candidateId: element.candidateId,
				candidateName: element.candidateName,
				candidatePassword: random_password,
				hasAppeared: false,
				Marks: 0,
			});
		});

		var compiled_object_exam = {
			examName: examName,
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			totalMarks: compiled_total_marks,
			questionBankId: questionBankId,
			candidates: compiled_candidates,
		};

		await exam_service.updateExam(user, compiled_object_exam);

		const found_elements = await exam_service.getFoundElements(user);

		if (found_elements === null) {
			return response.notFound(res, 'There is no user for the class.');
		} else {
			const candidate_list = JSON.parse(JSON.stringify(found_elements.classes[class_indx].candidates));

			await sendEmails(compiled_object_exam, found_elements, candidate_list);

			response.ok(res, found_elements);
		}
	} catch (error) {
		console.log(error);
		logger.errorLogger('Exam Module', error.message);
		response.internalServerError(res, error);
	}
}

function sendEmails(compiled_object_exam, found_elements, candidate_list) {
	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: compiled_object_exam.candidates.map((candidate) => {
			return {
				From: { Email: `ejemplo@gmail.com`, Name: `test` },
				To: [
					{
						Email: `${candidate_list.find((c) => c.candidateId === candidate.candidateId).candidateEmail}`,
						Name: `${candidate.candidateName}`,
					},
				],
				Subject: 'Exam login credentials',
				TextPart: 'Exam login credentials',
				HTMLPart: `
                    <center>
                        <h1>Login credentials and exam details</h1>
                        <table>
                            <tbody>
                                <tr><td>Examen</td><td>${compiled_object_exam.examName}</td></tr>
                                <tr><td>start time</td><td>${moment(compiled_object_exam.startDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                                <tr><td>End time</td><td>${moment(compiled_object_exam.endDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr><td>Link to exam</td><td><a href='https://exampledomain.com/examlive/${found_elements._id}/${found_elements.exams.find((e) => e.examName === compiled_object_exam.examName)._id}'>Link</a></td></tr>
                                <tr><td>Your id: </td><td>${candidate.candidateId}</td></tr>
                                <tr><td>Your password: </td><td>${candidate.candidatePassword}</td></tr>
                            </tbody>
                        </table>
                    </center>
                `,
				CustomID: `${candidate.candidateName}`,
			};
		}),
	});
	request
		.then((result) => {
			console.log(JSON.stringify(result.body));
		})
		.catch((err) => {
			console.log(err.statusCode);
		});
}

async function getInfo(req, res, next) {
	try {
		const user = req.payload.user;

		const found_element = await exam_service.getFoundElements(user);
		if (!found_element) return response.notFound(res, 'not found information');

		response.ok(res, found_element);
	} catch (error) {
		logger.errorLogger('Exam Module', error.message);
		response.internalServerError(res, error);
	}
}

async function getExams(req, res, next) {
	try {
		const user = req.payload.user;

		const exams = await exam_service.getExams(user);
		if (!exams) return response.notFound(res, 'not found information');

		response.ok(res, exams);
	} catch (error) {
		logger.errorLogger('Exam Module', error.message);
		response.internalServerError(res, error);
	}
}

async function deleteExam(req, res, next) {
	try {
		const user = req.payload.user;
		const examId = req.body.examId;

		const exam_data = await exam_service.getExamById(user, examId);
		if (!exam_data) return response.notFound(res, 'not found information');

		await exam_service.deleteExam(user, examId);

		const exams = await exam_service.getExams(user);
		if (!exams) return response.notFound(res, 'not found information');

		response.ok(res, exams);
	} catch (error) {
		logger.errorLogger('Exam Module', error.message);
		response.internalServerError(res, error);
	}
}

module.exports = { deleteExam, getExams, getInfo, createExam };
