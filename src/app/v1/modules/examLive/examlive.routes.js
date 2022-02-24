const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const exam_live_controller = require('./examlive.controller');
const exam_live_schema = require('./examlive.schema');

module.exports = (router) => {
	router.get('/examlive', validateRequestMiddleware(exam_live_schema.examLive, 'body'), exam_live_controller.getExamLive);

	router.post('/examlive/result', validateRequestMiddleware(exam_live_schema.examLiveResults, 'body'), exam_live_controller.getResultsExam);
};
