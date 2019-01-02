const Boom = require('boom');

const tokenModel = require('./token');

const { route: user } = require('./../user');
const { route: driver } = require('./../driver');
const { route: ride } = require('./../ride');

const routes = [{
  method: 'GET',
  path: '/logout',
  config: {
    auth: {
      strategy: 'jwt',
      access: [{
        scope: ['driver', 'user'],
      }],
    },
  },
  handler: async (request, reply) => {
    try {
      const action = await tokenModel.deleteData(request.auth.artifacts);
      return reply.response({
        data: action,
      })
      .unstate('session')
      .code(200)
    } catch (error) {
      return Boom.badRequest(error.message);
    }
  },
}];


module.exports = routes.concat(user, driver, ride);
