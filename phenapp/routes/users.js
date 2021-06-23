const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const user = require('../controllers/user.controller')
const { verifySignUp } = require('../middleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - nombre
 *         - apellido
 *         - telefono
 *         - enable
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Identificacion del usuario en el sistema
 *         email:
 *           type: string
 *           description: Correo electronico del usuario
 *         password:
 *           type: string
 *           description: Contraseña encriptada del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         telefono:
 *           type: string
 *           description: Telefono movil del usuario
 *         enable:
 *           type: boolean
 *           description: Estado del usuario
 *         role:
 *           type: string
 *           description: Rol del usuario dentro del sistema
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para el manejo de usuarios
 */

/**
 * @swagger
 * /api/users/getUsers:
 *   get:
 *     summary: Retorna una lista de todos los usuarios del sistema
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */

router.get(
  '/getUsers',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.getAll)

/**
 * @swagger
 * /api/users/delete/{userid}:
 *   get:
 *     summary: Desactiva el usuario ingresado
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificacion del usuario
 *     responses:
 *       200:
 *         description: El usuario fue desactivada con exito
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: No se ha encontrado el usuario
 */

router.get(
  '/delete/:userid',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.disableUser)

/**
 * @swagger
 * /api/users/updateUser:
 *   post:
 *     summary: Actualiza la informacion del usuario ingresado
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario ha sido actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/updateUser',
  [authJwt.verifyToken, authJwt.isAdmin],
  user.updateUser)

/**
 * @swagger
 * /api/users/updateRole:
 *   post:
 *     summary: Actualiza el rol del usuario ingresado
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El rol del usuario ha sido actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno
 */

router.post('/updateRole',
  [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRoleExisted],
  user.updateRole)

module.exports = router
