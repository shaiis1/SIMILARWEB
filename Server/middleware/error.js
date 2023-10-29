const errorHandler = (err, req, res) => {
    let error = { ...err }
  
    error.message = err.message
  
    console.log(err)
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error',
    })
  }
  
  module.exports = errorHandler
  