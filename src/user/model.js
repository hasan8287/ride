const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const Products = new Schema({
  // email for username
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		default: '',
	},
	longitude: {
		type: Number,
	},
	latitude: {
		type: Number,
	},
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	toJSON: {
    transform: function (doc, ret) {
    	ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  },
});

Products.statics = {

  /**
   * generate/hasing password
   * @param {string} password 
   */
  generatePasswordHash (password) {
    return Bcrypt.genSalt(10)
      .then(function (salt) {
        return Bcrypt.hash(password, salt);
      })
      .then(function (hash) {
        return { password, hash };
      });
  },

  getById (id) {
    return this.findOne({ _id:  id });
  },

	getByEmail (email) {
		return this.findOne({ email });
  },
  
	/**
   * updateData
   * * update data product
   * @param {data: object, limit: objectId}
   */

   updateData (data, id) {
   	return this.findOneAndUpdate({ _id: id }, {
   		$set: data,
   	}, { new: true });
   },

	/**
   * getAllUrl
   * * get data product
   * @param {page: int, limit: int}
   */

  getAllUrl () {
    return this.find({}).select({
    	_id: true,
    	url: true,
    });
  },

	/**
   * getData
   * * get data user
   * @param {page: int, limit: int}
   */
  getData (page = 1, limit = 10) {
    return this.paginate({}, { page, limit });
  },


	/**
   * createData
   * * for create data user
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


Products.plugin(mongoosePaginate);

module.exports = mongoose.model("users", Products);
