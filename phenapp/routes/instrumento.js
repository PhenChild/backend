const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const instrumento = require('../controllers/instrumento.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Instrumento:
 *       type: object
 *       required:
 *         - codigo
 *         - nombre
 *         - enable
 *         - EstacionCodigo
 *       properties:
 *         codigo:
 *           type: string
 *           description: El codigo ingresado para la estacion
 *         nombre:
 *           type: string
 *           description: Nombre del instrumento
 *         enable:
 *           type: boolean
 *           description: Estado de la estacion
 *         EstacionCodigo:
 *           type: string
 *           description: Codigo de la estacion al que pertenece el instrumento
 */

/**
 * @swagger
 * tags:
 *   name: Instrumentos
 *   description: Endpoints para el manejo de instrumentos
 */

/**
 * @swagger
 * /api/instrumentos/getInstrumentos:
 *   get:
 *     summary: Retorna una lista de todos los instrumentos del sistema
 *     tags: [Instrumentos]
 *     responses:
 *       200:
 *         description: Lista de instrumentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instrumento'
 */

router.get('/getInstrumentos',
  [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.getInstrumentos)

/**
 * @swagger
 * /api/instrumentos/getInstrumentoPorEstacion:
 *   get:
 *     summary: Retorna una lista de los instrumentos de una estacion
 *     tags: [Instrumentos]
 *     parameters:
 *       - in: body
 *         name: EstacionCodigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Codigo de la estacion
 *     responses:
 *       200:
 *         description: Lista de instrumentos de la estacion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instrumento'
 */

router.get('/getInstrumentoPorEstacion',
  [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.getInstrumentoPorEstacion)

module.exports = router
