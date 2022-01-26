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
						foundExamStatus = true;

						const found_candidate = found_exam.candidates.find((candidate) => {
							return candidate.candidateId === req.body.candidateId && candidate.candidatePassword === req.body.candidatePassword;
						});

						if (found_candidate.hasAppeared) return reject('El candidato ya ha aparecido para el examen.');

						if (found_candidate === undefined) return reject('Credenciales no válidas para acceder al examen.');

						const question_bank = found_examiner.questionBanks.find((queBank) => String(queBank._id) === found_exam.questionBankId);

						if (moment().isBetween(found_exam.startDateTime, found_exam.endDateTime) || devOption) {
							//to check if the request is between the exam start and end time

							if (question_bank === undefined) return reject('Banco de preguntas indefinido.');

							return resolve({
								status: 'success',
								data: {
									questionBank: question_bank,
									startDateTime: found_exam.startDateTime,
									endDateTime: found_exam.endDateTime,
								},
								message: 'Petición realizada exitosamente.',
							});
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
};
