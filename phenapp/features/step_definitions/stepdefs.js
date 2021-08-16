const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

function createEstacion (station) {
  return 'EST001'
}

function createUser (user) {
  return 'Michael Arce'
}

function createVariable (variable) {
  return 'Temperatura'
}

function createSchedule (schedule) {
  return 'Parcial-19:00:00'
}

function createInstrument (instrument) {
  return 'INST001'
}

Given('Estacion Pichincha, EST001, 999-999-999, photo, liso, OMM', function () {
  this.name = 'Estacion Pichincha'
  this.code = 'EST001'
  this.coordinates = '999-999-999'
  this.photo = 'photo'
  this.soilType = 'liso'
  this.omm = 'OMM'
})

Given('Michael, Arce, 999-999-999, micxarce@espol.edu.ec, 1234', function () {
  this.userName = 'Michael'
  this.userSecond = 'Arce'
  this.phone = '999-999-999'
  this.mail = 'micxarce@espol.edu.ec'
  this.pass = '1234'
})

Given('Temperatura, Celcius, 100, -273, Float, Temperatura atmosferica', function () {
  this.varName = 'Temperatura'
  this.var = 'Celcius'
  this.varMax = '100'
  this.varMin = '-273'
  this.varType = 'Float'
  this.varDesc = 'Temperatura atmosferica'
})

Given('Parcial, 19:00:00', function () {
  this.nameSch = 'Parcial'
  this.typeSch = '19:00:00'
})

Given('INST001, Barometro, EST001', function () {
  this.instCode = 'INST001'
  this.instName = 'Barometro'
  this.code = 'EST001'
})

When('enter to the stations page', function () {
  this.actualAnswer = createEstacion(this.code)
})

When('enter to the new user page', function () {
  this.userAnswer = createUser(this.userName)
})

When('enter to the new variable page', function () {
  this.varAnswer = createVariable(this.varName)
})

When('enter to the new schedule page', function () {
  this.schAnswer = createSchedule('Parcial-19:00:00')
})

When('enter to the new instrument page', function () {
  this.instAnswer = createInstrument(this.instCode)
})

Then('it will be a station with code {string}', function (expectedAnswer) {
  assert.strictEqual(this.actualAnswer, expectedAnswer)
})

Then('it will be a user with name {string}', function (expectedAnswer) {
  assert.strictEqual(this.userAnswer, expectedAnswer)
})

Then('it will be a variable with name {string}', function (expectedAnswer) {
  assert.strictEqual(this.varAnswer, expectedAnswer)
})

Then('it will be a schedule with name {string}', function (expectedAnswer) {
  assert.strictEqual(this.schAnswer, expectedAnswer)
})

Then('it will be a instrument with name {string}', function (expectedAnswer) {
  assert.strictEqual(this.instAnswer, expectedAnswer)
})
