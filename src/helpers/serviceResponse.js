'use strict';

function response(success, message, result) {
	return { success: success, message: message, result: result };
}

module.exports = response;
