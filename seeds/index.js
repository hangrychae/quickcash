const mongoose = require('mongoose');
const cities = require('./cities');
const {jobtype} = require('./jobtype');
const Job = require('../models/job');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/quickcash', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("DB connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
	await Job.deleteMany({});
	for(let i = 0; i < 50; i++){
		const random1000 = Math.floor(Math.random()*1000);
		const pay = Math.floor(Math.random()*20) + 20;
		const duration = Math.floor(Math.random()*100) + 20
		const job = new Job({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(jobtype)}`,
			image: 'https://cdn.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447-1520x800.webp',
			description: 'Help me with this job.',
			// pay: `${pay}`,
			pay,
			duration
			// duration: `${duration}`
			// pay: `$${pay} per session`,
			// duration: `${duration} minutes per session`,
		});
		await job.save();
	}

}

seedDB().then(() => {
    mongoose.connection.close();
})