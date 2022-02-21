const info = require('./swagger/info'),
	servers = require('./swagger/servers'),
	components = require('./swagger/components'),
	tags = require('./swagger/tags'),
	user = require('./swagger/paths/user'),
	classes = require('./swagger/paths/classes'),
	examlive = require('./swagger/paths/examlive'),
	exams = require('./swagger/paths/exams'),
	questionBanks = require('./swagger/paths/questionBanks');

module.exports = {
	...info,
	...servers,
	...tags,
	paths: { ...user, ...classes, ...examlive, ...exams, ...questionBanks },
	...components,
};
