const questionBanksRoute = require('../app/v1/modules/questionBanks/questionBanks.routes');
const examLiveRoute = require('../app/v1/modules/examLive/examlive.routes');
const ClassRoute = require('../app/v1/modules/class/classes.routes');
const examRoute = require('../app/v1/modules/exam/exams.routes');
const UserRoute = require('../app/v1/modules/user/user.routes');

async function RouteV1(app, router, prefix) {
	app.use(prefix, router);

	await questionBanksRoute(router);
	await examLiveRoute(router);
	await ClassRoute(router);
	await UserRoute(router);
	await examRoute(router);
}

async function RouteV2(app, router, prefix) {
	app.use(prefix, router);

	await questionBanksRoute(router);
	await examLiveRoute(router);
	await ClassRoute(router);
	await UserRoute(router);
	await examRoute(router);
}

module.exports = { RouteV1, RouteV2 };
