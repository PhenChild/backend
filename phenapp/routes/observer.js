// Observadores
const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const observador = require('../controllers/observador.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Observador:
 *       type: object
 *       required:
 *         - enable
 *         - EstacionCodigo
 *         - UserId
 *       properties:
 *         id:
 *           type: number
 *           description: Identificacion del observador
 *         enable:
 *           type: boolean
 *           description: Estado del observador
 *         EstacionCodigo:
 *           type: string
 *           description: Codigo de la estacion al que el observador esta asignado
 *         UserId:
 *           type: string
 *           description: Identificacion del usuario del sistema
 */

/**
 * @swagger
 * tags:
 *   name: Observadores
 *   description: Endpoints para el manejo de observadores
 */

/**
 * @swagger
 * /api/observers/getAll:
 *   get:
 *     summary: Retorna una lista de todos los observadores del sistema
 *     tags: [Observadores]
 *     responses:
 *       200:
 *         description: Lista de observadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Observador'
 */

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.getAll)

/**
 * @swagger
 * /api/observers/get/{userid}:
 *   get:
 *     summary: Retorna un observador por un UserID ingresado
 *     tags: [Observadores]
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario asociado al observador
 *     responses:
 *       200:
 *         description: Ha retornado con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Observador'
 *       404:
 *         description: No se ha encontrado el observador
 */

router.get(
  '/get',
  [authJwt.verifyToken],
  observador.getObserver
)

/**
 * @swagger
 * /api/observers/new:
 *   post:
 *     summary: Crea un nuevo observador
 *     tags: [Observadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Observador'
 *     responses:
 *       200:
 *         description: El observador ha sido generada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Observador'
 *       500:
 *         description: Error interno
 */

router.post(
  '/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.createObservador)

/**
 * @swagger
 * /api/observers/getObsByEst/{codigo}:
 *   get:
 *     summary: Retorna una lista de observadores por estaciones ingresada
 *     tags: [Observadores]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Codigo de la estacion
 *     responses:
 *       200:
 *         description: Ha retornado con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Observador'
 *       404:
 *         description: No se ha encontrado la estacion
 */

router.get(
  '/getObsByEst/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  observador.getObservadoresPorEstacion)

/**
 * @swagger
 * /api/observers/getEstacionPorObs:
 *   get:
 *     summary: Retorna la estacion asignada al observador ingresado
 *     tags: [Observadores]
 *     parameters:
 *       - in: body
 *         name: UserId
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificacion del usuario
 *     responses:
 *       200:
 *         description: Ha retornado con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacion'
 *       404:
 *         description: No se ha encontrado la estacion
 */

router.get('/getEstacionPorObs',
  [authJwt.verifyToken, authJwt.isObserver],
  observador.getEstacionPorObs)

router.post(
  '/update',
  [authJwt.verifyToken],
  observador.updateObserver)

router.post(
  '/updatePass',
  [authJwt.verifyToken],
  observador.updatePass)

module.exports = router
