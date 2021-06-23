const { authJwt } = require('../middleware')

const express = require('express')
const router = express.Router()

const horario = require('../controllers/horario.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       required:
 *         - tipoHora
 *         - hora
 *         - enable
 *       properties:
 *         id:
 *           type: number
 *           description: Identificacion del horario
 *         tipoHora:
 *           type: string
 *           description: Tipo de hora para medicion
 *         hora:
 *           type: string
 *           description: Hora del horario
 *         enable:
 *           type: boolean
 *           description: Estado del horario
 */

/**
 * @swagger
 * tags:
 *   name: Horarios
 *   description: Endpoints para el manejo de horarios
 */

/**
 * @swagger
 * /api/horarios/getHorarios:
 *   get:
 *     summary: Retorna una lista de todas los horarios del sistema
 *     tags: [Horarios]
 *     responses:
 *       200:
 *         description: Lista de horarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 */

router.get('/getHorarios', [authJwt.verifyToken, authJwt.isAdmin],
  horario.getHorarios)

module.exports = router
