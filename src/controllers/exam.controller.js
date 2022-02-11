const { EMAIL } = require('../core/config');
const exam_service = require('../services/exam.service');
const logger = require('../utils/logger');

const moment = require('moment');
const mailjet = require('node-mailjet').connect(EMAIL.MAILJET_API_KEY, EMAIL.MAILJET_API_SECRET);

function createExam(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const found_element = await exam_service.getFoundElement(data.user, data.classId);
			if (!found_element) return reject('No se encontro informacion');

			// checking if the exam with the same name already exists
			if (found_element.exams.find((e) => e.examName === data.examName) !== undefined) {
				return reject('El nombre del examen ya existe.');
			}

			const class_indx = found_element.classes.findIndex((e) => {
				return e._id.toString() === data.classId;
			});

			var compiled_total_marks = 0;

			const question_bank_indx = found_element.questionBanks.findIndex((e) => {
				return e._id.toString() === data.questionBankId;
			});

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
				examName: data.examName,
				startDateTime: data.startDateTime,
				endDateTime: data.endDateTime,
				totalMarks: compiled_total_marks,
				questionBankId: data.questionBankId,
				candidates: compiled_candidates,
			};

			await exam_service.updateExam(data.user, compiled_object_exam);

			const found_elements = await exam_service.getFoundElements(data.user);

			if (found_elements === null) {
				return reject('No existe ningún usuario para la clase.');
			} else {
				const candidate_list = JSON.parse(JSON.stringify(found_elements.classes[class_indx].candidates));

				await sendEmails(compiled_object_exam, found_elements, candidate_list);

				resolve({ status: 'success', data: found_elements.exams, message: 'Petición realizada exitosamente.' });
			}
		} catch (error) {
			logger.errorLogger('Exam Module', error.message);
			reject('Error internodel servidor.');
		}
	});
}

function sendEmails(compiled_object_exam, found_elements, candidate_list) {
	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: compiled_object_exam.candidates.map((candidate) => {
			return {
				From: { Email: `ejemplo@gmail.com`, Name: `prueba` },
				To: [
					{
						Email: `${candidate_list.find((c) => c.candidateId === candidate.candidateId).candidateEmail}`,
						Name: `${candidate.candidateName}`,
					},
				],
				Subject: 'Credenciales de inicio de sesión para el examen',
				TextPart: 'Credenciales de inicio de sesión para el examen',
				HTMLPart: `
                    <center>
                        <h1>Credenciales de inicio de sesión y detalles para el examen</h1>
                        <table>
                            <tbody>
                                <tr><td>Examen</td><td>${compiled_object_exam.examName}</td></tr>
                                <tr><td>Hora de inicio</td><td>${moment(compiled_object_exam.startDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                                <tr><td>Hora de finalización</td><td>${moment(compiled_object_exam.endDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr><td>enlace del examen</td><td><a href='https://midominio.com/examlive/${found_elements._id}/${found_elements.exams.find((e) => e.examName === compiled_object_exam.examName)._id}'>Link</a></td></tr>
                                <tr><td>Tú id: </td><td>${candidate.candidateId}</td></tr>
                                <tr><td>Tú contraseña: </td><td>${candidate.candidatePassword}</td></tr>
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

async function getInfo(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const found_element = await exam_service.getFoundElements(user);
			if (!found_element) return reject('No se encontro informacion');

			resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Exam Module', error.message);
			reject('Error internodel servidor.');
		}
	});
}

async function getExams(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const exams = await exam_service.getExams(user);
			if (!exams) return reject('No se encontro informacion');

			resolve({ status: 'success', data: exams, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Exam Module', error.message);
			reject('Error internodel servidor.');
		}
	});
}

async function deleteExam(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const exam_data = await exam_service.getExamById(data.user, data.examId);
			if (!exam_data) return reject('No se encontro informacion');

			await exam_service.deleteExam(data.user, data.examId);

			const exams = await exam_service.getExams(data.user);
			if (!exams) return reject('No se encontro informacion');

			resolve({ status: 'success', data: exams, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.errorLogger('Exam Module', error.message);
			reject('Error internodel servidor.');
		}
	});
}

module.exports = { deleteExam, getExams, getInfo, createExam };
