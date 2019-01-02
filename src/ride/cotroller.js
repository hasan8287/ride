const Boom = require('boom');
const Bcrypt = require('bcryptjs');

const { model: modelDriver } = require('././../driver');

const model = require('./model');

const controller = {};

/**
 * get data ride
 */
controller.getData = async (request, reply) => {
  try {
    const { query, auth } = request;
    const { page, limit } = query;
    const { credentials } = auth;

    const filter = {};
    if (credentials.id) filter.user_id = credentials.id;
    if (credentials.driver_id) filter.driver_id = credentials.driver_id;
    
    const data = await model.getData(parseInt(page, 10), parseInt(limit, 10), filter);

    return reply.response({
      data,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * user create ride and serach available driver
 */
controller.createRide = async (request, reply) => {
  try {
    const { payload, auth } = request;
    const { credentials  } = auth;

    payload.user_id = credentials.id;

    const [insert, driver] = await Promise.all([
      model.createData(payload),
      modelDriver.available(payload.localtion)
    ]);
    return reply.response({
      data: {
        driver,
        ...insert.toJSON(),
      },
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * aproved by driver
 */
controller.aproval = async (request, reply) => {
  try {
    const { params, auth } = request;
    const { credentials  } = auth;

    const action = await model.aproval({ id: params.id, driver_id: credentials.driver_id });

    if (!action) {
      return Boom.badData('failed update data');
    }

    return reply.response({
      data: action,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};

/**
 * update data by user
 */
controller.updateData = async (request, reply) => {
  try {
    const { params, auth, payload } = request;
    const { credentials  } = auth;

    const action = await model.updateData(payload, params.id, credentials.id);

    if (!action) {
      return Boom.badData('failed update data');
    }

    return reply.response({
      data: action,
    }).code(200);
  } catch (error) {
    return Boom.badRequest(error.message);
  }
};


module.exports = controller;
