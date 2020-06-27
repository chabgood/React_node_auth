const passport = require('passport')
const GooglePlusTokenStrategy = require('passport-google-plus-token')

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID:
        '1099149477827-5jpvqc5lauu46hnotd7mm99s04ku1f64.apps.googleusercontent.com',
      clientSecret: 'ya8Iupj8E5Kzb6yN4QZF61rA'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Access Token', accessToken)
      console.log('refresh Token', refreshToken)
      console.log('Profile', profile)
    }
  )
)
