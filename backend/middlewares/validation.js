const { validationResult, body } = require("express-validator");

const handleValidationError = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


exports.todoValidation = [body("title").notEmpty().withMessage('Title required'),handleValidationError]

