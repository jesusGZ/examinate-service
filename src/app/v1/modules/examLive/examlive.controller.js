const moment = require('moment');

const response = require('../../../../helpers/serviceResponse');
const exam_live_service = require('./examlive.service');
const logger = require('../../../../utils/logger');

async function getExamLive(req, res, next) {
	try {
		const { examinerId, examId, candidateId, candidatePassword } = req.body;

		const found_examiner = await exam_live_service.getExaminer(examinerId);
		if (!found_examiner) return response.error(res, 'No se encontro informacion del usuario.');

		let found_exam_status = false;
		const found_exam = found_examiner.exams;
		for (const i in found_exam) {
			if (String(found_exam[i]._id) === examId) {
				found_exam_status = true;

				const found_candidate = found_exam[i].candidates.find((candidate) => {
					return candidate._id.toString() === candidateId && candidate.candidatePassword === candidatePassword;
				});

				if (found_candidate === undefined) return response.error(res, 'Credenciales no válidas para acceder al examen.');

				if (found_candidate.hasAppeared) return response.error(res, 'El candidato ya ha aparecido para el examen.');

				const question_bank = found_examiner.questionBanks.find((queBank) => String(queBank._id) === found_exam[i].questionBankId);

				if (moment().isBetween(found_exam[i].startDateTime, found_exam[i].endDateTime)) {
					if (question_bank === undefined) return response.error(res, 'Banco de preguntas indefinido.');
					return response.ok(res, { questionBank: question_bank, startDateTime: found_exam[i].startDateTime, endDateTime: found_exam[i].endDateTime });
				} else {
					return response.error(res, `El examen aún no ha comenzado, inténtelo de nuevo entre ${moment(found_exam[i].startDateTime).utc().format('DD-MM-YYYY, h:mm:ss a')} & ${moment(found_exam[i].endDateTime).utc().format('DD-MM-YYYY, h:mm:ss a')}`);
				}
			}
		}

		if (!found_exam_status) return response.error('ExamId inválido');
	} catch (error) {
		logger.errorLogger('Exam Live Module', error.message);
		response.serverError(res, 'Error interno del servidor.');
	}
}

async function getResultsExam(req, res, next) {
	try {
		const { examinerId, examId, candidateId, candidatePassword, responses } = req.body;

		const examiner = await exam_live_service.getExaminer(examinerId);
		if (!examiner) return response.error(res, 'No se encontro informacion del usuario.');

		const exam_index = examiner.exams.findIndex((exam) => String(exam._id) === examId);

		const candidate_index = examiner.exams[exam_index].candidates.findIndex((candidate) => {
			return candidate.candidateId === candidateId && candidate.candidatePassword === candidatePassword;
		});

		if (candidate_index < 0) return response.error(res, 'Credenciales no válidas para acceder al examen.');

		if (moment().isBetween(examiner.exams[exam_index].startDateTime, examiner.exams[exam_index].endDateTime)) {
			if (!examiner.exams[exam_index].candidates[candidate_index].hasAppeared) {
				examiner.exams[exam_index].candidates[candidate_index].hasAppeared = true;
				examiner.exams[exam_index].candidates[candidate_index].responses = responses;

				const found_question_bank = examiner.questionBanks.find((questionBank) => String(questionBank._id) === examiner.exams[exam_index].questionBankId);

				var marks_count = 0;

				found_question_bank.questions.forEach((question) => {
					const foundResponse = responses.find((response) => response.questionId === String(question._id));

					if (foundResponse !== undefined) {
						const response_option = question.options.find((option) => foundResponse.optionId === String(option._id));

						if (response_option && response_option.value === question.correctOptionValue) marks_count += 1;
					}
				});

				examiner.exams[exam_index].candidates[candidate_index].Marks = marks_count;

				examiner.save();

				return response.ok(res, {
					candidateName: examiner.exams[exam_index].candidates[candidate_index].candidateName,
					Marks: marks_count,
					examName: examiner.exams[exam_index].examName,
					examinerName: examiner.username,
					examinerEmail: examiner.email,
				});
			} else {
				return response.error(res, 'El candidato ya ha aparecido para el examen.');
			}
		} else {
			return response.error(res, 'Su envío está fuera del tiempo de examen.');
		}
	} catch (error) {
		logger.errorLogger('Exam Live Module', error.message);
		response.serverError(res, 'Error interno del servidor.');
	}
}

module.exports = { getExamLive, getResultsExam };
