const info = require('./info'),
	servers = require('./servers'),
	components = require('./components'),
	tags = require('./tags'),
	user = require('./paths/user'),
	classes = require('./paths/classes'),
	examlive = require('./paths/examlive'),
	exams = require('./paths/exams'),
	questionBanks = require('./paths/questionBanks');

module.exports = {
	...info,
	...servers,
	...tags,
	paths: { ...user, ...classes, ...examlive, ...exams, ...questionBanks },
	...components,
};
