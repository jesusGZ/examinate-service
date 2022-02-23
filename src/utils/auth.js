const jwt = require('jsonwebtoken');

const { SECURITY } = require('../configs');
const user_service = require('../../src/app/v1/modules/user/user.service');
const response = require('../helpers/serviceResponse');

module.exports = async function authenticateJWToken(req, res, next) {
	const token = req.headers.token;
	/* const access_header = req.headers.token;
	const token = access_header && access_header.split(' ')[1]; */

	if (token === null || token === undefined) return response.tokenError(res, 'Token de acceso indefinido.');

	const decoded = await jwt.decode(token, { complete: false });
	if (!decoded) return response.tokenError(res);

	const data_key = await user_service.getPasswordById(decoded.id);
	if (!data_key) return response.tokenError(res);

	jwt.verify(token, SECURITY.JWT_KEY + data_key.password, (err, payload) => {
		if (err) {
			response.tokenError(res);
		} else {
			req.payload = payload;
			next();
		}
	});
};
