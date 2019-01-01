const controlller = require('./cotroller');

module.exports = [
  // update position user
  {
    method: 'PUT',
    path: '/user',
    config: {
      auth: {
        strategy: 'jwt',
        access: [{
          scope: ['user'],
        }],
      },
    },
    handler: controlller.updatePosition,
  },

  // register user
  {
    method: 'POST',
    path: '/user',
    config: { auth: false },
    handler: controlller.registerUser,
  },

   // login user
   {
    method: 'POST',
    path: '/user/login',
    config: { auth: false },
    handler: controlller.login,
  },
];
