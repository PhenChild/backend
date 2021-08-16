const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const tipo = require('../controllers/tipoinst.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoInstrumento:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *       properties:
 *         id:
 *           type: int
 *           description: El codigo del tipo
 *         nombre:
 *           type: string
 *           description: Nombre del tipo
 *         fechaCambio:
 */

/**
 * @swagger
 * tags:
 *   name: TiposInstrumento
 *   description: Endpoints para el manejo de los tipos de instrumentos del sistema
 */

/**
 * @swagger
 * /api/tipo/getAll:
 *   get:
 *     summary: Retorna una lista de todos los tipos de instrumentos
 *     tags: [TiposInstrumento]
 *     responses:
 *       200:
 *         description: TipoInstrumento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoInstrumento'
 */

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  tipo.getAll)

/**
 * @swagger
 * /api/tipo/newTipo:
 *   post:
 *     summary: Crea un nuevo tipo de instrumento
 *     tags: [TiposInstrumento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoInstrumento'
 *     responses:
 *       200:
 *         description: El registro ha sido generado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoInstrumento'
 *       500:
 *         description: Error interno
 */

router.post('/newTipo',
  [authJwt.verifyToken, authJwt.isAdmin],
  tipo.newTipo)

/**
 * @swagger
 * /api/tipo/updateTipo:
 *   post:
 *     summary: Actualiza la informacion de un tipo
 *     tags: [TiposInstrumento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoInstrumento'
 *     responses:
 *       200:
 *         description: La estacion ha sido actualizada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoInstrumento'
 *       500:
 *         description: Error interno
 */

router.post('/updateTipo', [authJwt.verifyToken, authJwt.isAdmin],
  tipo.updateTipo)

/**
 * @swagger
 * /api/tipo/disableTipo:
 *   post:
 *     summary: Desactiva un tipo de instrumento
 *     tags: [TiposInstrumento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoInstrumento'
 *     responses:
 *       200:
 *         description: La estacion ha sido actualizada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoInstrumento'
 *       500:
 *         description: Error interno
 */

router.post('/disableTipo', [authJwt.verifyToken, authJwt.isAdmin],
  tipo.disableTipo)

module.exports = router
