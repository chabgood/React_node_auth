const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

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
