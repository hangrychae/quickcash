const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
	title: String,
	image: String,
	pay: Number,
	duration: Number,
	description: String,
	location: String 
});

module.exports = mongoose.model('Job', JobSchema)