const { EMAIL } = require('../core/config');
const EXAM_LIVE_SERVICE = require('../services/examlive.service');
const logger = require('../utils/logger');

const moment = require('moment');
const mailjet = require('node-mailjet').connect(EMAIL.MAILJET_API_KEY, EMAIL.MAILJET_API_SECRET);

module.exports = class ExamProcess {
	getExamLive(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const exam_live_service = new EXAM_LIVE_SERVICE();

				const found_examiner = await exam_live_service.getExaminer(data.examinerId);
				if (!found_examiner) return reject('No se encontro informacion del usuario.');

				let found_exam_status = false;

				for (const i in found_examiner) {
					const found_exam = found_examiner.exams[i];

					if (String(found_exam._id) === req.body.examId) {
						found_exam_status = true;

						const found_candidate = found_exam.candidates.find((candidate) => {
							return candidate.candidateId === req.body.candidateId && candidate.candidatePassword === req.body.candidatePassword;
						});

						if (found_candidate.hasAppeared) return reject('El candidato ya ha aparecido para el examen.');

						if (found_candidate === undefined) return reject('Credenciales no válidas para acceder al examen.');

						const question_bank = found_examiner.questionBanks.find((queBank) => String(queBank._id) === found_exam.questionBankId);

						if (moment().isBetween(found_exam.startDateTime, found_exam.endDateTime) || devOption) {
							if (question_bank === undefined) return reject('Banco de preguntas indefinido.');

							return resolve({ status: 'success', data: { questionBank: question_bank, startDateTime: found_exam.startDateTime, endDateTime: found_exam.endDateTime }, message: 'Petición realizada exitosamente.' });
						} else {
							return reject(`El examen aún no ha comenzado, inténtelo de nuevo entre ${moment(found_exam.startDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} & ${moment(found_exam.endDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')}`);
						}
					}
				}

				if (!found_exam_status) return reject('ExamId inválido');
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor');
			}
		});
	}

	getResultsExam(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const exam_live_service = new EXAM_LIVE_SERVICE();

				const examiner = await exam_live_service.getExaminer(data.examinerId);
				if (!examiner) return reject('No se encontro informacion del usuario.');

				const exam_index = examiner.exams.findIndex((exam) => String(exam._id) === data.examId);

				// here also verifying credentials
				const candidate_index = examiner.exams[exam_index].candidates.findIndex((candidate) => {
					return candidate.candidateId === data.candidateId && candidate.candidatePassword === data.candidatePassword;
				});

				if (candidate_index < 0) return reject('Credenciales no válidas para acceder al examen.');

				if (moment().isBetween(examiner.exams[exam_index].startDateTime, examiner.exams[exam_index].endDateTime) || devOption) {
					// verify if user has taken the exam
					if (!examiner.exams[exam_index].candidates[candidate_index].hasAppeared) {
						// set reposes
						examiner.exams[exam_index].candidates[candidate_index].hasAppeared = true;
						examiner.exams[exam_index].candidates[candidate_index].responses = data.responses;

						// and calculate the marks
						const found_question_bank = examiner.questionBanks.find((questionBank) => String(questionBank._id) === examiner.exams[exam_index].questionBankId);

						var marks_count = 0;

						found_question_bank.questions.forEach((question) => {
							const foundResponse = data.responses.find((response) => response.questionId === String(question._id));

							if (foundResponse !== undefined) {
								const response_option = question.options.find((option) => foundResponse.optionId === String(option._id));

								if (response_option && response_option.value === question.correctOptionValue) marks_count += 1;
							}
						});

						examiner.exams[exam_index].candidates[candidate_index].Marks = marks_count;

						examiner.save();
						//Results response
						return resolve({
							status: 'success',
							data: {
								candidateName: examiner.exams[exam_index].candidates[candidate_index].candidateName,
								Marks: marks_count,
								examName: examiner.exams[exam_index].examName,
								examinerName: examiner.username,
								examinerEmail: examiner.email,
							},
							message: 'Petición realizada exitosamente.',
						});
					} else {
						return reject('El candidato ya ha aparecido para el examen.');
					}
				} else {
					return reject('Su envío está fuera del tiempo de examen.');
				}
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor');
			}
		});
	}
};
