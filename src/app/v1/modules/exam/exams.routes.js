const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const exam_controller = require('./exam.controller');
const authJWT = require('../../../../utils/auth');
const exam_schema = require('./exam.schema');

module.exports = (router) => {
	router.delete('/exam', authJWT, validateRequestMiddleware(exam_schema.examId, 'body'), exam_controller.deleteExam);

	router.post('/exam', authJWT, validateRequestMiddleware(exam_schema.exam, 'body'), exam_controller.createExam);

	router.get('/exams', authJWT, exam_controller.getExams);

	router.get('/info', authJWT, exam_controller.getInfo);
};
