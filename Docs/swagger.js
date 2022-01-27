const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');

const user = require('./paths/user');
const classes = require('./paths/classes');
const examlive = require('./paths/examlive');
const exams = require('./paths/exams');
const questionBanks = require('./paths/questionBanks');

module.exports = {
	...info,
	...servers,
	...tags,
	paths: {
		...user,
		...classes,
		...examlive,
		...exams,
		...questionBanks,
	},
	...components,
};
