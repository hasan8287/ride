const chai = require('chai');
const http = require('chai-http');

chai.use(http);

const baseUrl = 'http://localhost:8080';
const baseModule = '/product';
this.tmp = {};
describe('product module', () => {
  it('start product module', async () => {

    describe('create data ', () => {
      it('should success create data', async () => {
        const action = await chai.request(baseUrl)
          .post('/product')
          .send({
            url: 'https://fabelio.com/ip/fabelio-fitted-sprei-deluxe-tc-200.html',
          })
          .then((res) => {
            //console.log('res : ', res.body)
          })
          .catch((err) => {
            console.log('err : ', err)
          })
      });
    });

    describe('get data ', () => {
      it('should success get data', async () => {
        const action = await chai.request(baseUrl)
          .get('/product')
          .then(res => res.body)
        console.log('action : ', action)
        // this.tmp = action.body.docs[0];
      });
    });

  })
});