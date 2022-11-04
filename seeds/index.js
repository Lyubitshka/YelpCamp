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
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur animi incidunt saepe iste repellat voluptatibus ratione excepturi a. Nam reprehenderit ab quisquam dolor maiores molestias modi sunt laborum nulla!',
            price,
            geometry: 
              {
                type: 'Point',
                coordinates: [13.3888599, 52.5170365]
              },
            images: [
              {
                url: 'https://res.cloudinary.com/dpx3m7idk/image/upload/v1667494650/YelpCamp/mer844kx98mjfmk6lh0j.jpg',
                filename: 'YelpCamp/mer844kx98mjfmk6lh0j',
              },
              {
                url: 'https://res.cloudinary.com/dpx3m7idk/image/upload/v1667494655/YelpCamp/ny5sgmq3pwq9bad2u96e.png',
                filename: 'YelpCamp/ny5sgmq3pwq9bad2u96e',
              },
              {
                url: 'https://res.cloudinary.com/dpx3m7idk/image/upload/v1667494661/YelpCamp/hnvwzizi88yv4wet4fdj.png',
                filename: 'YelpCamp/hnvwzizi88yv4wet4fdj',
              }
              ]
        })
    await camp.save();
	}
}
		

seedDB().then(() => {
    mongoose.connection.close();
});
