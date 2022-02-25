function ok(res, result) {
	return res.status(200).json({ success: true, message: 'Petición realizada exitosamente.', result: result || null });
}

function methodNotAllowed(res, result) {
	return res.status(405).json({ success: false, message: 'Método no permitido', result: result || null });
}

function internalServerError(res, result) {
	return res.status(500).json({ success: false, message: 'Error interno del servidor.', result: result || null });
}

function unauthorized(res, message) {
	return res.status(401).json({ success: false, message: message || 'No autorizado', result: null });
}

function badRequest(res, message, result) {
	return res.status(400).json({ success: false, message: message, result: result || null });
}

module.exports = { ok, badRequest, internalServerError, methodNotAllowed, unauthorized };
