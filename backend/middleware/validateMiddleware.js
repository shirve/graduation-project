const { validationResult } = require('express-validator')

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
    // res.status(400).json({ type: 'error', message: 'Niepoprawne dane użytkownika' })
  }
}

// Sequential - stop if previous one failed
// const validate = (validations) => {
//   return async (req, res, next) => {
//     for (let validation of validations) {
//       const result = await validation.run(req)
//       if (result.errors.length) break
//     }

//     const errors = validationResult(req)
//     if (errors.isEmpty()) {
//       return next()
//     }

//     res.status(400).json({ errors: errors.array() })
//   }
// }

module.exports = { validate }
