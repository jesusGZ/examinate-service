'use strict';

const jwt = require('jsonwebtoken');
const response = require('../serviceResponse');
const { JWT } = require('../../configs');

async function AuthMiddleware(req, reply, done) {
	const token = req.headers['authorization'] != undefined ? req.headers['authorization'].substr(7) : null;

	if (token) {
		jwt.verify(token, JWT.JWT_KEY, (err, decoded) => {
			if (err) return reply.code(401).send(response(401, false, 'Token is not valid !', null));

			return true;
		});
	} else {
		return reply.code(401).send(response(401, 'Token is not supplied !', null));
	}
}

module.exports = AuthMiddleware;
