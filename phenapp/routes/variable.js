const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const variable = require('../controllers/variable.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Variable:
 *       type: object
 *       required:
 *         - nombre
 *         - unidad
 *         - maximo
 *         - minimo
 *         - tipoDato
 *         - enable
 *       properties:
 *         id:
 *           type: number
 *           description: Identificacion de la variable en el sistema
 *         nombre:
 *           type: string
 *           description: Nombre de la variable
 *         unidad:
 *           type: string
 *           description: Unidad de medicion de la variable
 *         maximo:
 *           type: number
 *           description: Valor maximo que puede alcanzar la variable
 *         minimo:
 *           type: number
 *           description: Valor minimo que puede tener una variable
 *         tipoDato:
 *           type: string
 *           description: Tipo de dato que tiene la medicion de la variable
 *         enable:
 *           type: boolean
 *           description: Estado de la variable
 */

/**
 * @swagger
 * tags:
 *   name: Variables
 *   description: Endpoints para el manejo de variables
 */

/**
 * @swagger
 * /api/variables/getVariables:
 *   get:
 *     summary: Retorna una lista de todas las variables del sistema
 *     tags: [Variables]
 *     responses:
 *       200:
 *         description: Lista de variables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variable'
 */

router.get('/getVariables',
  variable.getVariables)

/**
 * @swagger
 * /api/variables/new:
 *   post:
 *     summary: Crea una nueva variable
 *     tags: [Variables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variable'
 *     responses:
 *       200:
 *         description: La variable ha sido generada con exito con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variable'
 *       500:
 *         description: Error interno
 */

router.post('/new',
  [authJwt.verifyToken, authJwt.isAdmin],
  variable.createVariable)

/**
 * @swagger
 * /api/variables/updateVariable:
 *   post:
 *     summary: Actualiza la informacion de una variable
 *     tags: [Variables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variable'
 *     responses:
 *       200:
 *         description: La variable ha sido actualizada con exito con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variable'
 *       404:
 *         description: La variable ingresada no ha sido encontrada
 */

router.post('/updateVariable',
  [authJwt.verifyToken, authJwt.isAdmin],
  variable.updateVariable)

/**
 * @swagger
 * /api/variables/delete/{variableid}:
 *   get:
 *     summary: Desactiva la variable ingresado
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Identificacion de la variable
 *     responses:
 *       200:
 *         description: La variable fue desactivada con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variable'
 *       404:
 *         description: No se ha encontrado la variable
 */

router.get(
  '/delete/:variableid',
  [authJwt.verifyToken, authJwt.isAdmin],
  variable.disableVariable)

module.exports = router
