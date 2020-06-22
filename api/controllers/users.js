const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { JWT_SECRET } = require('../configurations/index')

signToken = (user) => {
  return JWT.sign(
    {
      sub: user.insertId
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body
    bcrypt.hash(password, 10, function (err, hash) {
      User.query(
        'insert into users set email = ?, password = ?',
        [email, hash],
        (error, user) => {
          if (error) console.log('error' + error)
          if (user) {
            token = signToken(user)
            res.status(200).json({ token })
          }
        }
      )
    })
  },
  signIn: async (req, res, next) => {
    console.log('UsersController.signIn called!')
  },
  secret: async (req, res, next) => {
    console.log('muy')
  }
}
