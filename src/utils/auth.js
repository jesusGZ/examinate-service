const jwt = require('jsonwebtoken');

const { SECURITY } = require('../core/config');
const user_service = require('../services/user.service');

module.exports = async function authenticateJWToken(req, res, next) {
	const token = req.headers.token;
	/* const access_header = req.headers.token;
	const token = access_header && access_header.split(' ')[1]; */

	if (token === null || token === undefined) return res.json({ status: 'error', message: 'Token de acceso indefinido.' });

	const decoded = await jwt.decode(token, { complete: false });
	if (!decoded) return res.json({ status: 'error', message: 'Invalid token.' });

	const data_key = await user_service.getPasswordById(decoded.id);
	if (!data_key) return res.json({ status: 'error', message: 'Invalid token.' });

	jwt.verify(token, SECURITY.JWT_KEY + data_key.password, (err, payload) => {
		if (err) {
			res.json({ status: 'error', message: 'Invalid token' });
		} else {
			req.payload = payload;
			next();
		}
	});
};
