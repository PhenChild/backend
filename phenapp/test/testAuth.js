const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('/GET NoTokenProvided', () => {
  console.log('Prueba de ingreso sin autorizacion')
  chai.request(server)
    .get('/api/users/getUsers')
    .end((err, res) => {
      console.log(res.body)
    })
})
