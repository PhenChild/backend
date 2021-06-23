const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('/GET NoTokenProvided', () => {
  console.log('Prueba de ingreso de token no valido')
  chai.request(server)
    .get('/api/estaciones/getAll')
    .set('x-access-token', 'token')
    .end((err, res) => {
      console.log(res.body)
    })
})
