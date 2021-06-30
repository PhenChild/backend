const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const obsRouter = require('./routes/observer')
const regRouter = require('./routes/registry')
const estRouter = require('./routes/estacion')
const varestRouter = require('./routes/variableestacion')
const horaRouter = require('./routes/horario')
const instrRouter = require('./routes/instrumento')
const varRouter = require('./routes/variable')

const app = express()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PhenChild Backend',
      version: '1.0.0',
      description: 'Backend para el proyecto PhenChild'
    },
    servers: [
      {
        url: 'http://[::]:3000'
      }
    ]
  },
  apis: ['routes/*.js']
}

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

app.use('/api', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/observers', obsRouter)
app.use('/api/registry', regRouter)
app.use('/api/estaciones', estRouter)
app.use('/api/vars-estaciones', varestRouter)
app.use('/api/horarios', horaRouter)
app.use('/api/instrumentos', instrRouter)
app.use('/api/variables', varRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
