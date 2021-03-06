const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
exports.getOverView = async (req, res) => {
  //get tours
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours
  });
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });
  if (!tour) {
    return next(new AppError('there is no tour with that name', 400));
  }
  // console.log(tour)
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log in to you account'
  });
});

exports.getAccount = (req, res) => { 
  res.status(200).render('account', {
    title: 'Your account'
  }); 
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email
  },{
    new:true,
    runValidators:true
  });
  res.status(200).render('account', {
    title: 'Your account',
    user:updatedUser
  });
});
