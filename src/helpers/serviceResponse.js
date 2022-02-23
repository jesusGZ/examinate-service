'use strict';

function ok(res, message, result) {
	return res.status(200).json({ success: true, message: message, result: result || null });
}

function error(res, message, result) {
	return res.status(400).json({ success: false, message: message, result: result || null });
}

function serverError(res, result) {
	return res.status(500).json({ success: false, message: 'Error interno del servidor.', result: result || null });
}

function methodError(res, result) {
	return res.status(405).json({ success: false, message: 'Metodo de peticion no valido', result: result || null });
}

module.exports = { ok, error, serverError, methodError };
