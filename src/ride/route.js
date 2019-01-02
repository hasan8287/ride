const controlller = require('./cotroller');

module.exports = [

  // get data ride
  {
    method: 'GET',
    path: '/ride',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['user', 'driver'],
        }],
      },
    },
    handler: controlller.getData,
  },

  // request ride firt stap
  {
    method: 'POST',
    path: '/ride',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['user'],
        }],
      },
    },
    handler: controlller.createRide,
  },

  // aproval by driver
  {
    method: 'PUT',
    path: '/ride/approval',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['driver'],
        }],
      },
    },
    handler: controlller.aproval,
  },

  // update by user
  {
    method: 'PUT',
    path: '/ride/{id}',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['user'],
        }],
      },
    },
    handler: controlller.updateData,
  },

];
