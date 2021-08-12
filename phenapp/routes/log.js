const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const log = require('../controllers/log.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - idRegistro
 *         - nombreUser
 *         - fechaCambio
 *         - comentario
 *       properties:
 *         idRegistro:
 *           type: int
 *           description: El codigo del registro actualizado
 *         nombreUser:
 *           type: string
 *           description: Nombre del usuario que realizo el cambio
 *         fechaCambio:
 *           type: date
 *           description: Fecha en que se realizo el cambio
 *         comentario:
 *           type: string
 *           description: Comentario respecto al cambio
 */

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Endpoints para el manejo del log de cambios de los registros
 */

/**
 * @swagger
 * /api/log/getAll:
 *   get:
 *     summary: Retorna una lista de todos los cambios realizdos en los registros
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Log
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  log.getAll)

/**
 * @swagger
 * /api/log/newLog:
 *   post:
 *     summary: Crea un nuevo registro dentro del log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: El registro ha sido generado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       500:
 *         description: Error interno
 */

router.post('/newLog',
  [authJwt.verifyToken, authJwt.isAdmin],
  log.newLog)

module.exports = router
