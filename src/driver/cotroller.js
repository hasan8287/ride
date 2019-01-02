const Boom = require('boom');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const model = require('./model');
const tokenModel = require('./../core/token');

const controller = {};

/**
 * getData
 * * get available data user
 */
controller.getData = async (request, reply) => {
  try {
    const { query } = request;
    const { page, limit } = query;

    const data = await model.available({
      status: 'on'
    }, parseInt(page, 10), parseInt(limit, 10));

    return reply.response({
      data,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

controller.updatePosition = async (request, reply) => {
  try {
    const { payload, auth } = request;
    const { credentials  } = auth;
    
    const action = await model.updateData(payload, credentials.driver_id);

    return reply.response({
      data: action,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * driver user
 */
controller.login = async (request, reply) => {
  try {
    const { payload } = request;

    const data = await model.getByEmail(payload.username);
    if (data) {
      const valid = await Bcrypt.compare(payload.password, data.password);
      if (valid) {

        const token = JWT.sign({
          driver_id: data._id,
          email: data.email,
          name: data.name,
          scope: 'driver',
        }, process.env.SCRET_KEY); 

        // create data token
        await tokenModel.createData({
          value: token,
        });

        return reply.response({
          data: {
            token,
            ...data.toJSON(),
          },
        }).state('session', {
          token_driver: token,
        }).code(200);
      }
    }

    return Boom.badData('incorect username or password');
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * create data users
 */
controller.registerDriver = async (request, reply) => {
  try {
    const { payload } = request;
    const password = await model.generatePasswordHash(payload.password);

    payload.password = password.hash;

    const action = await model.createData(payload);

    if (!action) {
      return Boom.badGateway('failed save data');
    }

    action.password = password.password;
    return reply.response({
      data: action,
    }).code(201);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * updateStatus
 ** update staus driver on when ride cancel or finish
 ** update status driver after approval ride to ride(status)
*/
controller.updateStatus = async (id, status = 'on') => {
  try {
    const action = await model.updateData({
      status
    }, id);
    return action;
  } catch (error) {
    return error;
  }
}

module.exports = controller;

