const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Rides = new Schema({
	user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'drivers',
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  destination: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  status: {
    type: String,
    enum: ['new', 'process', 'finish', 'cancel'],
    default: 'new',
  }
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	toJSON: {
    transform: function (doc, ret) {
    	ret.ride_id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  },
});

Rides.statics = {

  /**
   * driver aproval rides
   */
  aproval(param) {
    return this.findOneAndUpdate({
      _id: param.id,
      status: 'new',
    }, {
      $set: {
        status: 'process',
        driver_id: param.driver_id,
      }
    }, {
      new: true,
    })
  },

  getById (id) {
    return this.findOne({ _id:  id });
  },

	getByEmail (email) {
		return this.findOne({ email });
  },
  
	/**
   * updateData
   * * update data driver
   * @param {data: object, limit: objectId}
   */
  updateData (data, id, user_id) {
    return this.findOneAndUpdate({ _id: id, user_id }, {
      $set: data,
    }, { new: true });
  },

	/**
   * getData
   * * get data driver
   * @param {page: int, limit: int, filter: object}
   */
  getData (page = 1, limit = 10, filter) {
    return this.paginate(filter, { page, limit });
  },


	/**
   * createData
   * * for create data driver
   * @param {object}
   */
  createData (param) {
    const data = new this(param);
    return data.save();
  },

  deleteData () {
  	return this.remove({});
  },
}


Rides.plugin(mongoosePaginate);

module.exports = mongoose.model("rides", Rides);
