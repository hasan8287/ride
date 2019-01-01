const controlller = require('./cotroller');

module.exports = [

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
    method: 'POST',
    path: '/ride/{id}',
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
    handler: controlller.createRide,
  },

];
