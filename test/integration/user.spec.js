const chai = require('chai');
const http = require('chai-http');

chai.use(http);
this.tmp = {};

before(() => {
  this.integration = require('./index.spec');
});

it('should success register user', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('user')
    .send({
      email: 'hasan8287@gmail.com',
      name: 'fuad',
      password: 'hasan',
    });
  // console.log('action : ', action)
});

it('should failed login user', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('user/login')
    .send({
      email: 'hasan8287@gmail.com',
      name: 'fuad',
      password: 'failed',
    });
  console.log('action : ', action)
});

after(() => {
  module.exports = this.tmp;
})