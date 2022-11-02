const express = require('express');
const router = express.Router( { mergeParams: true } );

const reviews = require('../controllers/reviews');

const { validateReview , isLoggedIn } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;