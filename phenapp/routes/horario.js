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

/**
 * @swagger
 * /api/horarios/newHorario:
 *   post:
 *     summary: Crea un nuevo horario
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: El horario ha sido generado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Horario'
 *       500:
 *         description: Error interno
 */

router.post('/newHorario', [authJwt.verifyToken, authJwt.isAdmin],
  horario.newHorario)

/**
 * @swagger
 * /api/horarios/updateHorario:
 *   post:
 *     summary: Actualiza la informacion de un horario
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: El horario ha sido actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrumento'
 *       500:
 *         description: Error interno
 */

router.post('/updateHorario', [authJwt.verifyToken, authJwt.isAdmin],
  horario.updateHorario)

/**
 * @swagger
 * /api/horarios/disableHorario:
 *   post:
 *     summary: Desactiva un horario
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: El horario ha sido desactivado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrumento'
 *       500:
 *         description: Error interno
 */

router.post('/disableHorario', [authJwt.verifyToken, authJwt.isAdmin],
  horario.disableHorario)

module.exports = router
