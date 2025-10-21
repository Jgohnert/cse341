const {
    body,
    validationResult
} = require("express-validator");

function ContactRules() {
    return [
        body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide a first name."),

        body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide a last name."),

        body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required."),

        body("favoriteColor")
        .escape()
        .notEmpty()
        .isLength({
            min: 3
        })
        .withMessage("Please provide a valid color."),

        body("birthday")
        .trim()
        .notEmpty()
        .withMessage("Please provide a birthday.")
    ]
}

async function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
}

module.exports = {
    ContactRules,
    handleValidationErrors
}