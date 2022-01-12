const class_schema = require('../core/validators/schemas/class.schema');
const validateRequestMiddleware = require('../core/middlewares/validateRequest');
const CLASS_CONTROLLER = require('../controllers/class.controller');
const authJWT = require('../utils/auth');

const class_controller = new CLASS_CONTROLLER();

module.exports = (app) => {};
