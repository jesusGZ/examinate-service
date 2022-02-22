'use strict';

const UserRoute = require('../app/v1/src/modules/user/user.routes');
const ClassRoute = require('../app/v1/src/modules/class/classes.routes');
const examRoute = require('../app/v1/src/modules/exam/exams.routes');
const examLiveRoute = require('../app/v1/src/modules/examLive/examlive.routes');
const questionBanksRoute = require('../app/v1/src/modules/questionBanks/questionBanks.routes');

async function RouteV1(app, router, prefix) {
	app.use(prefix, router);

	await UserRoute(router);
	await ClassRoute(router);
	await examRoute(router);
	await examLiveRoute(router);
	await questionBanksRoute(router);
}

async function RouteV2(app, router, prefix) {
	app.use(prefix, router);

	await UserRoute(router);
	await ClassRoute(router);
	await examRoute(router);
	await examLiveRoute(router);
	await questionBanksRoute(router);
}

module.exports = { RouteV1, RouteV2 };
