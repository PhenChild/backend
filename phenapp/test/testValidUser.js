const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('/GET NoTokenProvided', () => {
  console.log('Prueba de ingreso sin rol de administrador')
  const token = jwt.sign({ id: '1e49f043-0d4a-48b1-a1ff-dd3fecad9118' }, config.secret, {
    expiresIn: '30s'
  })
  chai.request(server)
    .get('/api/estaciones/getAll')
    .set('x-access-token', token)
    .send({ userId: '1e49f043-0d4a-48b1-a1ff-dd3fecad9118' })
    .end((err, res) => {
      console.log(res.body)
    })
})
