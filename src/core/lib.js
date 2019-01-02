const { model: modelDriver } = require('./../driver');
const { model: modelUser } = require('./../user');
const tokenModel = require('./token');

const lib = {};

lib.validate = async (decoded, request, h) => {
  try {
    const checkToken = await tokenModel.getByValue(request.auth.token);
    if (!checkToken) throw new Error('token not found');

    const { id, driver_id } = decoded;
    let data = null;
    if (id) {
      data = await modelUser.getById(id);
    }

    if (driver_id) {
      data = await modelDriver.getById(driver_id);
    }

    if (data) return { isValid: true };
    return { isValid: false };
  } catch (error) {
    return { isValid: false }; 
  }
};

module.exports = lib;
