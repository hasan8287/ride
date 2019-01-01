const controlller = require('./cotroller');

module.exports = [
  // update position driver
  {
    method: 'PUT',
    path: '/driver',
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
