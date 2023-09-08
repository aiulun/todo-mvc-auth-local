// Config file for using passport

const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
// Config file requires the User model. Create variable 'User' and store this model
const User = require('../models/User')

// Function will be exported that takes a passport parameter
module.exports = function (passport) {
  // Initialize authentication strategy for authenticating users based on email and password
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Check the database for user email
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      // If there is an error, return the error
      if (err) { return done(err) }
      // If the user doesn't exist, return the message 'email is not found'
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      // If there is no password, return the message
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      // Check the password entered by user to make sure they match
      user.comparePassword(password, (err, isMatch) => {
        // If there is an error return the error
        if (err) { return done(err) }
        // If the passwords match, return the user's data
        if (isMatch) {
          return done(null, user)
        }
        // If the password doesn't match, return the invalid email or password message
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  
// Serialize the user id
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Deserialize the user id
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
