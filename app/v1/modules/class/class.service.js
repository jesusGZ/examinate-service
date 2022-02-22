const examinerModel = require('../../models/examiner.model');

async function getFoundElements(user) {
	const data = await examinerModel.findOne({ user: user }, { classes: 1 });
	return data;
}

async function getClassById(user, classId) {
	const data = await examinerModel.findOne({ user: user, 'classes._id': classId }, { classes: 1 });
	return data;
}

async function getClasses(user, class_name) {
	const data = await examinerModel.findOne({ user: user, 'classes.className': class_name }, { classes: 1 });
	return data;
}

/* async function getClassesDistinctId(user, className, id) {
		//const data = await examinerModel.findOne({ user: user, 'classes.className': className, 'classes._id': id }, { classes: 1 });
		const data = await examinerModel.aggregate([
			{
				$unwind: '$classes',
			},
			{
				$match: {
					user: user,
					'classes.className': className,
					'classes._id': { $ne: id },
				},
			},
			{
				$project: {
					'classes.className': 1,
				},
			},
		]);

		return data;
	} */

async function insertClass(user, class_name) {
	const data = await examinerModel.findOneAndUpdate({ user: user }, { $addToSet: { classes: { className: class_name } } });
	return data;
}

async function updateClass(user, id, className, candidates) {
	const updatedClass = { _id: id, className: className, candidates: candidates };
	const data = await examinerModel.findOneAndUpdate({ user: user, 'classes._id': id }, { $set: { 'classes.$': updatedClass } });
	return data;
}

async function deleteClass(user, classId) {
	const data = await examinerModel.findOneAndUpdate({ user: user }, { $pull: { classes: { _id: classId } } });
	return data;
}

module.exports = { getFoundElements, getClassById, getClasses, insertClass, updateClass, deleteClass };
