const jwt = require('jsonwebtoken');

const { SECURITY } = require('../core/config');

function authenticateJWToken(req, res, next) {
	const access_header = req.headers['authorization'];
	const token = access_header && access_header.split(' ')[1];
	if (token === null) return res.json({ status: 'error', message: 'No token' });

	jwt.verify(token, SECURITY.JWT_SECRET_KEY, (err, payload) => {
		if (err) {
			res.json({ status: 'error', message: 'Invalid token' });
		} else {
			req.payload = payload;
			next();
		}
	});
}

module.exports = authenticateJWToken;
