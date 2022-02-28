const baseJoi = require('joi');
const JoiDate = require('@hapi/joi-date');
baseJoi.objectId = require('joi-objectid')(baseJoi);

const { uri_regex } = require('../configs/regex');
const customValidations = require('./custom');

const Joi = baseJoi.extend(JoiDate).extend(customValidations.string);

const candidate_email = Joi.string().trim().removeSpaces().max(36).hasSQLWords().hasInvalidChars().email();
const password = Joi.string().trim().removeSpaces().min(5).max(16).hasSQLWords().hasInvalidChars();
const email = Joi.string().trim().removeSpaces().max(36).hasSQLWords().hasInvalidChars().email();
const user_name = Joi.string().trim().removeSpaces().max(16).hasSQLWords().hasInvalidChars();
const secret = Joi.string().trim().removeSpaces().max(16).hasSQLWords().hasInvalidChars();
const correct_option_value = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const jwt = Joi.string().trim().removeSpaces().hasSQLWords().hasInvalidChars().jwt();
const question_bank_name = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const candidate_name = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const candidate_exam = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const exam_name = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const classes = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const value = Joi.string().trim().max(100).hasSQLWords().hasInvalidChars();
const marks = Joi.string().trim().max(24).hasSQLWords().hasInvalidChars();
const name = Joi.string().trim().max(30).hasSQLWords().hasInvalidChars();
const link = Joi.string().trim().removeSpaces().uri().regex(uri_regex);
const date = Joi.date().format('YYYY-MM-DD');
const active = Joi.boolean();
const id = Joi.objectId();

module.exports = {
	correct_option_value,
	question_bank_name,
	candidate_email,
	candidate_name,
	candidate_exam,
	user_name,
	exam_name,
	password,
	classes,
	secret,
	active,
	marks,
	value,
	date,
	email,
	name,
	link,
	Joi,
	jwt,
	id,
};
