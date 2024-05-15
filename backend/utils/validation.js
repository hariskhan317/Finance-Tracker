import { body, validationResult } from 'express-validator';

export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.usEmpty()) {
                break;
            }
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            return res.status(422).json({ errors: errors.array() });
        }
    }
}

export const loginValidator = () => {
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isLength({ min: 3, }).withMessage('email is short');
    body('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({min:3}).withMessage('Password lenght is short');
}

export const signinValidator = () => {
    body('name')
        .notEmpty().withMessage('name is Required')
        .isLength({ min: 3, }).withMessage('name lenght is short');
    loginValidator();
}