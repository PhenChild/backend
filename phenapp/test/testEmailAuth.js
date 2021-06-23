const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('/POST checkDuplicateEmail', () => {
  console.log('Prueba de registro de usuario ya registrado')
  const token = jwt.sign({ id: '13fa9646-2536-4c93-87e3-8dbe1775c15d' }, config.secret, {
    expiresIn: '30s'
  })
  chai.request(server)
    .post('/api/auth/signup')
    .set('x-access-token', token)
    .send({ email: 'adm@admin', password: 'ejemplo', nombre: 'ejemplo', apellido: 'ejemplo', telefono: 'ejemplo', role: 'admin' })
    .end((err, res) => {
      console.log(res.body)
    })
})
