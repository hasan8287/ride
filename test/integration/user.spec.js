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
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(201);
  this.tmp.createData = action.body.data;
});

it('should failed login user', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('user/login')
    .send({
      username: 'hasan8287@gmail.com',
      password: 'failed',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(422);
});

it('should success login user', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('user/login')
    .send({
      username: 'hasan8287@gmail.com',
      password: 'hasan',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.login = action.body.data;
});

it('should success update location', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put('user')
    .set({
      Authorization: this.tmp.login.token,
    })
    .send({
      longitude: '-6.175110',
      latitude: '106.865036',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.update = action.body.data;
});


after(() => {
  module.exports = this.tmp;
})