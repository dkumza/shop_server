const yup = require('yup');

// Validation Schemas
const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Email must be valid email'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const signUpSchema = yup.object({
  name: yup.string('Enter name').trim().min(3).required('Name is required'),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  telephone: yup.string().trim().required('Telephone is required'),
  password: yup
    .string('Enter your password')
    .trim()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

// Validation middleware
const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    // validate schema from req.body and {show all validation errors}
    const user = await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorObject = {};
    error.inner.forEach((err) => {
      errorObject[err.path] = err.message;
    });
    res.status(400).json(errorObject);
  }
};

const loginValidation = validationMiddleware(loginSchema);
const signUpValidation = validationMiddleware(signUpSchema);

module.exports = {
  loginValidation,
  signUpValidation,
};
