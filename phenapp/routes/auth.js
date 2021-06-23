const express = require('express')
const router = express.Router()
const { verifySignUp } = require('../middleware')
const auth = require('../controllers/auth.controller')
const { authJwt } = require('../middleware')

/**
 * @swagger
 * tags:
 *   name: Autorizacion
 *   description: Endpoints para el manejo de autorizaciones
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Crea nuevo usuario en el sistema
 *     tags: [Autorizacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario ha sido creado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/signup', [
  authJwt.verifyToken,
  authJwt.isAdmin,
  verifySignUp.checkDuplicateEmail,
  verifySignUp.checkRoleExisted
],
auth.signup)

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Autoriza el ingreso de un usuario al sistema
 *     tags: [Autorizacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario logro ingresar con extio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/signin', auth.signin)

/**
 * @swagger
 * /api/auth/signinAdmin:
 *   post:
 *     summary: Autoriza el ingreso de un usuario administrador al sistema
 *     tags: [Autorizacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario logro ingresar con extio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/signinAdmin', [authJwt.isAdminByEmail],
  auth.signin)

/**
 * @swagger
 * /api/auth/signinObs:
 *   post:
 *     summary: Autoriza el ingreso de un usuario observador a la aplicacion movil
 *     tags: [Autorizacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario logro ingresar con extio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/signinObs', [authJwt.isObserverByEmail],
  auth.signin)

module.exports = router
