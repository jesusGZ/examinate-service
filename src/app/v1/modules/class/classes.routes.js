const validateRequestMiddleware = require('../../../../helpers/middleware/validateRequest');
const class_controller = require('./class.controller');
const authJWT = require('../../../../utils/auth');
const class_schema = require('./class.schema');

module.exports = (router) => {
	router.delete('/class', authJWT, validateRequestMiddleware(class_schema.classes_del, 'body'), class_controller.deleteClass);
	router.put('/class', authJWT, validateRequestMiddleware(class_schema.classes_up, 'body'), class_controller.updateClass);
	router.post('/class', authJWT, validateRequestMiddleware(class_schema.classes, 'body'), class_controller.createClass);
	router.get('/class', authJWT, class_controller.getClass);
};
