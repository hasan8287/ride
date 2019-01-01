
const { route: user } = require('./../user');
const { route: driver } = require('./../driver');
const { route: ride } = require('./../ride');

module.exports = [].concat(user, driver, ride);
