const express = require('express')
const router = require('express-promise-router')()
const schemas = require('../helpers/routeHelpers')
const passport = require('passport')
const UsersController = require('../controllers/users')
const middleware = require('../middleware/validations')
const passportJwt = require('../passport-jwt')
const passportLocal = require('../passport-local')
const passportGoogle = require('../passport-google')

router
  .route('/signUp')
  .post(middleware(schemas.validateBody), UsersController.signUp)

router.route('/signIn').post(UsersController.signIn)

router
  .route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }))

router
  .route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret)

module.exports = router
