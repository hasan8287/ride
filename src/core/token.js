const mongoose = require('mongoose');

const { Schema } = mongoose;

const Tokens = new Schema({
  value: {
    type: String,
    required: true,
  }
});

Tokens.statics = {
  /**
   * createData
   * * for create data token
   * @param {object}
   */
  createData (param) {
    const data = new this(param);
    return data.save();
  },

  deleteData (value) {
  	return this.remove({ value });
  },

  getByValue (value) {
    return this.findOne({ value });
  },

};

module.exports = mongoose.model("tokens", Tokens);
