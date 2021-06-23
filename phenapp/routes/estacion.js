const express = require('express')
const router = express.Router()
const { authJwt } = require('../middleware')
const estacion = require('../controllers/estacion.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Estacion:
 *       type: object
 *       required:
 *         - codigo
 *         - nombreEstacion
 *         - posicion
 *         - altitud
 *         - suelo
 *         - omm
 *         - enable
 *       properties:
 *         codigo:
 *           type: string
 *           description: El codigo ingresado para la estacion
 *         nombreEstacion:
 *           type: string
 *           description: Nombre de la estacion ingresada
 *         posicion:
 *           type: object
 *           description: Coordenadas de la posicion de la estacion
 *         altitud:
 *           type: number
 *           description: Altitud a nivel del mar de la estacion
 *         suelo:
 *           type: string
 *           description: Tipo de suelo de la estacion
 *         omm:
 *           type: string
 *           description: Codigo omm de la estacion
 *         enable:
 *           type: boolean
 *           description: Estado de la estacion
 *         jefeId:
 *           type: number
 *           description: Identificacion del observador principal de la estacion
 */

/**
 * @swagger
 * tags:
 *   name: Estaciones
 *   description: Endpoints para el manejo de estaciones
 */

/**
 * @swagger
 * /api/estaciones/getAll:
 *   get:
 *     summary: Retorna una lista de todas las estaciones del sistema
 *     tags: [Estaciones]
 *     responses:
 *       200:
 *         description: Lista de estaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estacion'
 */

router.get('/getAll',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.getEstaciones)

/**
 * @swagger
 * /api/estaciones/delete/{id}:
 *   get:
 *     summary: Desactiva una estacion por codigo
 *     tags: [Estaciones]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Codigo de la estacion
 *     responses:
 *       200:
 *         description: La estacion fue desactivada con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacion'
 *       404:
 *         description: No se ha encontrado la estacion
 */

router.get(
  '/delete/:codigo',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.disableEstacion)

/**
 * @swagger
 * /api/estaciones/new:
 *   post:
 *     summary: Crea una nueva estacion
 *     tags: [Estaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estacion'
 *     responses:
 *       200:
 *         description: La estacion ha sido generada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacion'
 *       500:
 *         description: Error interno
 */

router.post('/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.createEstacion)

/**
 * @swagger
 * /api/estaciones/updateEstacion:
 *   post:
 *     summary: Actualiza la informacion de una estacion
 *     tags: [Estaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estacion'
 *     responses:
 *       200:
 *         description: La estacion ha sido actualizada con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estacion'
 *       500:
 *         description: Error interno
 */

router.post('/updateEstacion',
  [authJwt.verifyToken, authJwt.isAdmin],
  estacion.updateEstacion)

module.exports = router
