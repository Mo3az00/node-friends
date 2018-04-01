// Async Await errors as a higher order function used for routes
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

// 404 Errors
exports.notFound = (req, res, next) => {
  res.render('404', {
    title: 'Error 404',
    bodyClass: 'scrolled'
  })
}

// MongoDB validation Errors
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) {
    return next(err)
  }

  Object.keys(err.errors).forEach((key) => {
    req.flash('danger', err.errors[key].message)
  })

  res.redirect('back')
}

// Development Error Stacktrace
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || ''

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }

  res.status(err.status || 500)
  res.format({
    'text/html': () => {
      res.render('error', errorDetails)
    },
    'application/json': () => {
      res.json(errorDetails)
    }
  })
}

// Uncatched production errors
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    status: err.status
  })
}
