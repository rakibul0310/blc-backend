const { check, validationResult } = require("express-validator");

// register
const registerValidators = [
  check("sponsor_id").notEmpty().withMessage("Sponsor Id is required"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Please write only character"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 6,
    })
    .withMessage("Please Write More than 6 characters")
    .matches(/[!@#$%^&*()_+{:;"'|/}]/)
    .withMessage("Please write atleast one special character")
    .matches(/[0-9]/)
    .withMessage("Please write atleast one number"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Write Valid Email"),

  // check("mobile")
  //     .notEmpty()
  //     .withMessage("Mobile number is required")
  //     .isLength({
  //         min: 12,
  //         max: 13
  //     })
  //     .withMessage("Please write valid mobile number")
];

const registerValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// login
const loginValidators = [
  check("user_id").notEmpty().withMessage("Sponsor Id is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// forgotPassword
const forgotPasswordValidators = [
  check("user_id").notEmpty().withMessage("Email is required"),
];

const forgotPasswordValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// resetPassword
const resetPasswordValidators = [
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 6,
    })
    .withMessage("Please Write More than 6 characters")
    .matches(/[!@#$%^&*()_+{:;"'|/}]/)
    .withMessage("Please write atleast one special character")
    .matches(/[0-9]/)
    .withMessage("Please write atleast one number"),
];

const resetPasswordValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// updatePassword
const updatePasswordValidators = [
  check("new_password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 6,
    })
    .withMessage("Please Write More than 6 characters")
    .matches(/[!@#$%^&*()_+{:;"'|/}]/)
    .withMessage("Please write atleast one special character")
    .matches(/[0-9]/)
    .withMessage("Please write atleast one number"),
];

const updatePasswordValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// updateEmail
const updateEmailValidators = [
  check("new_email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Write Valid Email"),
];

const updateEmailValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// supportTicket
const supportTicketValidators = [
  check("purpose").notEmpty().withMessage("purpose is required"),
  check("previous_ticket_reff").notEmpty().withMessage("select your Complaint"),
  check("question").notEmpty().withMessage("write your description please"),
];

const supportTicketValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// contactus
const contactusValidators = [
  check("name").notEmpty().withMessage("name is required"),
  check("email").notEmpty().withMessage("email is required"),
  check("user_id").notEmpty().withMessage("User ID is required"),
  check("message").notEmpty().withMessage("message is required"),
];

const contactusValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// createUpdate
const createUpdateValidators = [
  check("title").notEmpty().withMessage("title is required"),
  check("description").notEmpty().withMessage("description is required"),
];

const createUpdateValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

// Contact
const ContactValidators = [
  check("name").notEmpty().withMessage("name is required"),
  check("user_id").notEmpty().withMessage("user_id is required"),
  check("email").notEmpty().withMessage("email is required"),
  check("message").notEmpty().withMessage("message is required"),
  check("subject").notEmpty().withMessage("subject is required"),
  check("mobile").notEmpty().withMessage("mobile is required"),
];

const ContactValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  registerValidators,
  registerValidationHandler,
  loginValidators,
  loginValidationHandler,
  forgotPasswordValidators,
  forgotPasswordValidationHandler,
  resetPasswordValidators,
  resetPasswordValidationHandler,
  updatePasswordValidators,
  updatePasswordValidationHandler,
  updateTrxPasswordValidators,
  updateTrxPasswordValidationHandler,
  updateEmailValidators,
  updateEmailValidationHandler,
  topupValidators,
  topupValidationHandler,
  fundTransferValidators,
  fundTransferValidationHandler,
  depositAmountValidators,
  depositAmountValidationHandler,
  topupAccountValidators,
  topupAccountValidationHandler,
  withdrawAmountValidators,
  withdrawAmountValidationHandler,
  updateTxrAddressValidators,
  updateTxrAddressValidationHandler,
  supportTicketValidators,
  supportTicketValidationHandler,
  contactusValidators,
  contactusValidationHandler,
  createUpdateValidators,
  createUpdateValidationHandler,
  ContactValidators,
  ContactValidationHandler,
};
