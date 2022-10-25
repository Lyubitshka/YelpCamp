const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpCamp')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0 ; i < 50 ; i++) {
	    const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
	    const camp = new Campground({
            author: '6357ec266c0f3c4e420562b3',
    		location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://random.imagecdn.app/500/150', 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur animi incidunt saepe iste repellat voluptatibus ratione excepturi a. Nam reprehenderit ab quisquam dolor maiores molestias modi sunt laborum nulla!',
            price
        })
    await camp.save();
	}
}
		

seedDB().then(() => {
    mongoose.connection.close();
});
