const { SECURITY } = require('../core/config');
const EXAM_SERVICE = require('../services/exam.service');
const logger = require('../utils/logger');

module.exports = class ExamProcess {
	createExam(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const exam_service = new EXAM_SERVICE();

				const foundElement = await exam_service.getFoundElement(data.username, data.classId);
				if (!foundElement) return reject('No se encontro informacion');

				// checking if the exam with the same name already exists
				if (foundElement.exams.find((e) => e.examName === data.examName) !== undefined) {
					return reject('El nombre del examen ya existe.');
				}

				const classIndx = foundElement.classes.findIndex((e) => {
					return e._id.toString() === data.classId;
				});

				var compiledTotalMarks = 0;

				const questionBankIndx = foundElement.questionBanks.findIndex((e) => {
					return e._id.toString() === data.questionBankId;
				});

				foundElement.questionBanks[questionBankIndx].questions.forEach((element) => {
					compiledTotalMarks += element.marks;
				});

				var compiledCandidates = [];

				foundElement.classes[classIndx].candidates.forEach((element) => {
					const randomPassword = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 8);

					compiledCandidates.push({
						candidateId: element.candidateId,
						candidateName: element.candidateName,
						candidatePassword: randomPassword,
						hasAppeared: false,
						Marks: 0,
					});
				});

				var compiledObjectExam = {
					examName: data.examName,
					startDateTime: data.startDateTime,
					endDateTime: data.endDateTime,
					totalMarks: compiledTotalMarks,
					questionBankId: data.questionBankId,
					candidates: compiledCandidates,
				};

				await exam_service.updateExam(data.username, compiledObjectExam);

				const foundElements = await exam_service.getFoundElements(data.username);

				if (foundElements === null) {
					return reject('No existe ningún usuario para la clase.');
				} else {
					//Sending emails to all the compiled candidates

					const candidateList = JSON.parse(JSON.stringify(foundElements.classes[classIndx].candidates));

					await this.sendEmails(compiledObjectExam, foundElements, candidateList);

					//----end of sending mail ----

					resolve({ status: 'success', data: foundElements.exams, message: 'Petición realizada exitosamente.' });
				}
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor');
			}
		});
	}

	sendEmails(compiledObjectExam, foundElement, candidateList) {
		// console.log(compiledObjectExam);
		// console.log(foundElement);
		// console.log(candidateList);

		// compiledObjectExam.candidates.map((candidate) => {
		//     console.log(
		//         candidateList.find((c) => c.candidateId === candidate.candidateId)
		//     );

		//     console.log();
		// });

		const request = mailjet.post('send', { version: 'v3.1' }).request({
			Messages: compiledObjectExam.candidates.map((candidate) => {
				return {
					From: {
						Email: `	
                    ejemplo@gmail.com`,
						Name: `prueba`,
					},
					To: [
						{
							Email: `${candidateList.find((c) => c.candidateId === candidate.candidateId).candidateEmail}`,
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
                                <tr><td>Examen</td><td>${compiledObjectExam.examName}</td></tr>
                                <tr><td>Hora de inicio</td><td>${moment(compiledObjectExam.startDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                                <tr><td>Hora de finalización</td><td>${moment(compiledObjectExam.endDateTime).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC/GMT</td></tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr><td>enlace del examen</td><td><a href='https://midominio.com/examlive/${foundElement._id}/${foundElement.exams.find((e) => e.examName === compiledObjectExam.examName)._id}'>Link</a></td></tr>
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
};
