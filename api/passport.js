const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const { JWT_SECRET } = require('./configurations/index')
const User = require('./models/user')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = User.query('SELECT * FROM users WHERE id = ? limit 1', [
          payload.sub
        ])
        if (!user) {
          return done(null, false)
        }

        done(null, user)
      } catch (error) {}
    }
  )
)

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (emai, password, done) => {
      try {
        const user = User.query('SELECT * FROM users WHERE email = ? limit 1', [
          email
        ])
        if (!user) {
          return done(null, false)
        }

        done(null, user)
      } catch (error) {}
    }
  )
)
