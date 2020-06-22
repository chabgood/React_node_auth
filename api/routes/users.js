const express = require('express')
const router = require('express-promise-router')()
const schemas = require('../helpers/routeHelpers')
const passport = require('passport')
const UsersController = require('../controllers/users')
const middleware = require('../middleware/validations')
const passportConf = require('../passport')

router
  .route('/signUp')
  .post(middleware(schemas.validateBody), UsersController.signUp)

router.route('/signIn').post(UsersController.signIn)

router
  .route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret)

module.exports = router
