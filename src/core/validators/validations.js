const baseJoi = require('joi');
const JoiDate = require('@hapi/joi-date');
baseJoi.objectId = require('joi-objectid')(baseJoi);

const customValidationsSanitizers = require('./custom');
const { uri_regex } = require('../config/regex');

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
const link = Joi.string().trim().removeSpaces().uri().regex(uri_regex);
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
