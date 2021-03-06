const Boom = require('boom');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const model = require('./model');
const tokenModel = require('./../core/token');

const controller = {};

controller.updatePosition = async (request, reply) => {
  try {
    const { payload, auth } = request;
    const { credentials  } = auth;
    
    const action = await model.updateData(payload, credentials.id);

    return reply.response({
      data: action,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * login user
 */
controller.login = async (request, reply) => {
  try {
    const { payload } = request;

    const data = await model.getByEmail(payload.username);
    if (data) {
      const valid = await Bcrypt.compare(payload.password, data.password);
      if (valid) {
        const token = JWT.sign({
          id: data._id,
          email: data.email,
          name: data.name,
          scope: 'user',
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
          token_user: token,
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
controller.registerUser = async (request, reply) => {
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

module.exports = controller;

