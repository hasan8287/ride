require('dotenv').config()

const Hapi = require('hapi');
const mongoose = require('mongoose');

const { routes, lib } = require('./core');

const Server = Hapi.Server({
  host: process.env.HOST,
  port: process.env.PORT,
  routes: {cors: {origin: ['*']}},
});

Server.state('session', {  
  ttl: 1000 * 60 * 60 * 24,    // 1 day lifetime
  encoding: 'base64json'       // cookie data is JSON-stringified and Base64 encoded
});

async function start() {
  try {
    await mongoose.connect(encodeURI(process.env.DB_URL), { useNewUrlParser: true });
    await Server.register(require('hapi-auth-jwt2'));
    Server.auth.strategy('jwt', 'jwt',
      { key: process.env.SCRET_KEY, // Never Share your secret key
        validate: lib.validate, // validate function defined above
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });
    Server.auth.default('jwt');
    Server.route(routes);
    
    await Server.start();
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('server running at', Server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
