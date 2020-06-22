const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('./configurations/index')
const User = require('./models/user')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = Article.query('SELECT * FROM users WHERE id = ? limit 1', [
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
