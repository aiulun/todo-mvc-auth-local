// Export an object with an 'ensureAuth' method
module.exports = {
    ensureAuth: function (req, res, next) {
      // When the request comes in check if person is logged in
      if (req.isAuthenticated()) {
        // If user is logged in, continue
        return next()
      } else {
        // If user is not logged in, redirect to the root route
        res.redirect('/')
      }
    }
  }
  