'use strict';

const DefaultRoute = require('./default');
const UserRoute = require('../modules/user/user.routes');
const examRoute = require('../modules/exam/exams.routes');
const examLiveRoute = require('../modules/examLive/examlive.routes');
const questionBanksRoute = require('../modules/questionBanks/questionBanks.routes');

async function RouteV1(app) {
	await UserRoute(app);
	await examRoute(app);
	await examLiveRoute(app);
	await questionBanksRoute(app);
	await DefaultRoute(app);
}

module.exports = RouteV1;
