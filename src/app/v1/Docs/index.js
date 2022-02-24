const questionBanks = require('./swagger/paths/questionBanks'),
	examlive = require('./swagger/paths/examlive'),
	components = require('./swagger/components'),
	classes = require('./swagger/paths/classes'),
	exams = require('./swagger/paths/exams'),
	user = require('./swagger/paths/user'),
	servers = require('./swagger/servers'),
	tags = require('./swagger/tags'),
	info = require('./swagger/info');

module.exports = {
	...info,
	...servers,
	...tags,
	paths: { ...user, ...classes, ...examlive, ...exams, ...questionBanks },
	...components,
};
