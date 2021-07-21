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
 * /api/instrumentos/newInstrumento:
 *   post:
 *     summary: Crea un nuevo instrumento
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrumento'
 *     responses:
 *       200:
 *         description: El instrumento ha sido generado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrumento'
 *       500:
 *         description: Error interno
 */

router.post('/newInstrumento',
  [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.newInstrumento)

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

/**
 * @swagger
 * /api/instrumentos/updateInstrumento:
 *   post:
 *     summary: Actualiza la informacion de un instrumento
 *     tags: [Intrumentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrumento'
 *     responses:
 *       200:
 *         description: El instrumento ha sido actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrumento'
 *       500:
 *         description: Error interno
 */

router.post('/updateInstrumento', [authJwt.verifyToken, authJwt.isAdmin],
  instrumento.updateInstrumento)

module.exports = router
