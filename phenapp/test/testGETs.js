const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('Test GETs', () => {
  console.log('Pruebas para todos los GETs del sistema')
  const token = jwt.sign({ id: '13fa9646-2536-4c93-87e3-8dbe1775c15d' }, config.secret, {
    expiresIn: '30s'
  })
  // eslint-disable-next-line no-undef
  describe('/api/estaciones estaciones', () => {
    chai.request(server)
      .get('/api/estaciones/getAll')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/users usuarios', () => {
    chai.request(server)
      .get('/api/users/getUsers')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/horarios horarios', () => {
    chai.request(server)
      .get('/api/horarios/getHorarios')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/instrumentos instrumentos', () => {
    chai.request(server)
      .get('/api/instrumentos/getInstrumentos')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/observers observadores', () => {
    chai.request(server)
      .get('/api/observers/getAll')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/registry registros', () => {
    chai.request(server)
      .get('/api/registry/getRegistros')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/variables variables', () => {
    chai.request(server)
      .get('/api/variables/getVariables')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
  // eslint-disable-next-line no-undef
  describe('/api/vars-estaciones variables por estacion', () => {
    chai.request(server)
      .get('/api/vars-estaciones/getVariableEstacionAll')
      .set('x-access-token', token)
      .send({ userId: '13fa9646-2536-4c93-87e3-8dbe1775c15d' })
      .end((err, res) => {
        console.log(res.body)
      })
  })
})
