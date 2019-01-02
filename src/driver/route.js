const controlller = require('./cotroller');

module.exports = [
  // get available driver
  {
    method: 'GET',
    path: '/driver',
    config: { auth: false },
    handler: controlller.getData,
  },

  // update position driver
  {
    method: 'PUT',
    path: '/driver',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['driver'],
        }],
      },
    },
    handler: controlller.updatePosition,
  },

  // register driver
  {
    method: 'POST',
    path: '/driver',
    config: { auth: false },
    handler: controlller.registerDriver,
  },

   // login driver
   {
    method: 'POST',
    path: '/driver/login',
    config: { auth: false },
    handler: controlller.login,
  },
];
