function ok(res, result) {
	return res.status(200).json({ success: true, message: 'Request made successfully.', result: result || null });
}

function methodNotAllowed(res, result) {
	return res.status(405).json({ success: false, message: 'method not allowed.', result: result || null });
}

function internalServerError(res, result) {
	return res.status(500).json({ success: false, message: 'Internal Server Error.', result: result || null });
}

function unauthorized(res, message) {
	return res.status(401).json({ success: false, message: message || 'Not authorized.', result: null });
}

function badRequest(res, message, result) {
	return res.status(400).json({ success: false, message: message, result: result || null });
}

function noContent(res, message) {
	return res.status(204).json({ success: false, message: message || 'No content.', result: null });
}

function notFound(res, message) {
	return res.status(404).json({ success: false, message: message || 'not found information.', result: null });
}

module.exports = { ok, badRequest, internalServerError, methodNotAllowed, unauthorized, noContent, notFound };
