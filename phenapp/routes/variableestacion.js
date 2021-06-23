const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const varsEst = require('../controllers/variableestacion.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     VariableEstacion:
 *       type: object
 *       required:
 *         - enable
 *         - EstacionCodigo
 *         - VariableId
 *         - HorarioId
 *         - InstrumentoCodigo
 *       properties:
 *         id:
 *           type: number
 *           description: Identificacion del registro VariableEstacion
 *         enable:
 *           type: boolean
 *           description: Estado del registro VariableEstacion
 *         EstacionCodigo:
 *           type: string
 *           description: Codigo de la estacion asignada
 *         VariableId:
 *           type: number
 *           description: Identificacion de la variable asignada
 *         HorarioId:
 *           type: number
 *           description: Identificacion del horario asignado
 *         InstrumentoCodigo:
 *           type: string
 *           description: Identificacion del instrumento de medicion asignado
 */

/**
 * @swagger
 * tags:
 *   name: Variables por Estaciones
 *   description: Endpoints para el manejo de variableEstacion
 */

/**
 * @swagger
 * /api/vars-estaciones/getVariableEstacionAll:
 *   get:
 *     summary: Retorna una lista de todos los registros VariableEstacion del sistema
 *     tags: [Variables por Estaciones]
 *     responses:
 *       200:
 *         description: Lista de registros VariableEstacion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VariableEstacion'
 */

router.get('/getVariableEstacionAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.getVarEstAll)

/**
 * @swagger
 * /api/vars-estaciones/assign:
 *   post:
 *     summary: Asigna las variables a medir para una estacion
 *     tags: [Variables por Estaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariableEstacion'
 *     responses:
 *       200:
 *         description: Las variables han sido asignadas con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       419:
 *         description: No se ha podido asignar las variables
 */

router.post('/assign',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.assignVariableEstacion)

/**
 * @swagger
 * /api/vars-estaciones/getVariablesPorEstacion/{codigo}:
 *   get:
 *     summary: Retorna las variables asignadas a la estacion ingresada
 *     tags: [Variables por Estaciones]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Codigo de la estacion
 *     responses:
 *       200:
 *         description: Las variables han sido retornadas con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VariableEstacion'
 *       419:
 *         description: No se ha encontrado la estacion
 */

router.get('/getVariablesPorEstacion/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.getVariablesPorEstacion)

/**
 * @swagger
 * /api/vars-estaciones/getVarsObs:
 *   get:
 *     summary: Retorna una lista de todas las variables asignadas al observador
 *     tags: [Variables por Estaciones]
 *     responses:
 *       200:
 *         description: Lista de variables del observador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VariableEstacion'
 */

router.get('/getVarsObs',
  [authJwt.verifyToken, authJwt.isObserver],
  varsEst.getVariableObs)

/**
 * @swagger
 * /api/vars-estaciones/delete/{varestid}:
 *   get:
 *     summary: Desactiva el registro VariableEstacion ingresado
 *     tags: [Variables por Estaciones]
 *     parameters:
 *       - in: path
 *         name: varestid
 *         schema:
 *           type: number
 *         required: true
 *         description: Identificacion del registro VariableEstacion
 *     responses:
 *       200:
 *         description: El registro fue desactivada con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VariablEstacion'
 *       404:
 *         description: No se ha encontrado el usuario
 */

router.get(
  '/delete/:varestid',
  [authJwt.verifyToken, authJwt.isAdmin],
  varsEst.disableVariableEstacion)

module.exports = router
