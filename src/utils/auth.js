const jwt = require('jsonwebtoken');

const { SECURITY } = require('../core/config');
const USER_SERVICE = require('../services/user.service');

async function authenticateJWToken(req, res, next) {
	const user_service = new USER_SERVICE();

	const access_header = req.headers.authorization;
	const token = access_header && access_header.split(' ')[1];
	if (token === null) return res.json({ status: 'error', message: 'No token' });

	const decoded = jwt.decode(token, { complete: false });

	const data_key = await user_service.getPasswordById(decoded.payload);

	jwt.verify(token, SECURITY.JWT_KEY + data_key.password, (err, payload) => {
		if (err) {
			res.json({ status: 'error', message: 'Invalid token' });
		} else {
			req.payload = payload;
			next();
		}
	});
}

module.exports = authenticateJWToken;