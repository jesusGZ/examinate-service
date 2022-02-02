const regexUri =
	/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

const baseJoi = require('joi');
const JoiDate = require('@hapi/joi-date');
baseJoi.objectId = require('joi-objectid')(baseJoi);

const customValidationsSanitizers = require('./custom');

const Joi = baseJoi.extend(JoiDate).extend(customValidationsSanitizers.string);

const candidateEmail = Joi.string().trim().removeSpaces().max(36).hasSQLWords().hasInvalidChars().email();
const password = Joi.string().trim().removeSpaces().min(5).max(16).hasSQLWords().hasInvalidChars();
const email = Joi.string().trim().removeSpaces().max(36).hasSQLWords().hasInvalidChars().email();
const username = Joi.string().trim().removeSpaces().max(16).hasSQLWords().hasInvalidChars();
const secret = Joi.string().trim().removeSpaces().max(16).hasSQLWords().hasInvalidChars();
const correctOptionValue = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const jwt = Joi.string().trim().removeSpaces().hasSQLWords().hasInvalidChars().jwt();
const questionBankName = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const candidateName = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const candidateExam = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const examname = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const classes = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const value = Joi.string().trim().max(100).hasSQLWords().hasInvalidChars();
const marks = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const name = Joi.string().trim().max(30).hasSQLWords().hasInvalidChars();
const link = Joi.string().trim().removeSpaces().uri().regex(regexUri);
const fecha = Joi.date().format('YYYY-MM-DD');
const active = Joi.boolean();
const id = Joi.objectId();

module.exports = {
	correctOptionValue,
	questionBankName,
	candidateEmail,
	candidateName,
	candidateExam,
	username,
	examname,
	password,
	classes,
	secret,
	active,
	marks,
	value,
	fecha,
	email,
	name,
	link,
	Joi,
	jwt,
	id,
};
