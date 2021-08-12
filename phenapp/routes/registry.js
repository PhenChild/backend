const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro:
 *       type: object
 *       required:
 *         - valor
 *         - fechaObservacion
 *         - posicionObservacion
 *         - VariableEstacionId
 *         - ObservadorId
 *       properties:
 *         id:
 *           type: number
 *           description: Identificacion del registro
 *         valor:
 *           type: string
 *           description: Resultado de la medicion de la variable
 *         fechaObservacion:
 *           type: string
 *           description: Fecha en que se realizo el registro
 *         posicionObservacion:
 *           type: object
 *           description: Posicion donde se realizo el registro
 *         VariableEstacionId:
 *           type: number
 *           description: identificacion de la variable registrada
 *         ObservadorId:
 *           type: number
 *           description: Identificacion del observador que realizo el registro
 */

/**
 * @swagger
 * tags:
 *   name: Registros
 *   description: Endpoints para el manejo de registros
 */

const registro = require('../controllers/registro.controller')

/**
 * @swagger
 * /api/registry/new:
 *   post:
 *     summary: Crea un nuevo registro
 *     tags: [Registros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       200:
 *         description: El registro se ha generado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registro'
 *       500:
 *         description: Error interno
 */

router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isObserver],
  registro.createRegistro)

/**
 * @swagger
 * /api/registry/getRegistros:
 *   get:
 *     summary: Retorna una lista de todos los registros del sistema
 *     tags: [Registros]
 *     responses:
 *       200:
 *         description: Lista de registros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registro'
 */

router.get('/getRegistros',
  registro.getRegistros)

router.get('/getRegistrosEstacion',
  registro.getRegistrosEstacion)

/**
 * @swagger
 * /api/registry/estVarHoraFilter:
 *   post:
 *     summary: Filtra los registros dependiendo de la estacion, variable y fechas ingresadas
 *     tags: [Registros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       200:
 *         description: Se ha filtrado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registro'
 *       500:
 *         description: Error interno
 */

router.post('/estVarHoraFilter',
  registro.estacionVariableHoraFilter)

router.post('/updateRegistry',
  [authJwt.verifyToken, authJwt.isObserver],
  registro.updateRegistry)

module.exports = router
