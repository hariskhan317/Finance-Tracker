import { body, validationResult } from 'express-validator';

export const loginValidator = () => {
    return [
        body('email')
            .isEmail().withMessage('Email format is not correct')
            .notEmpty().withMessage('Email is Required')
            .isLength({ min: 3, }).withMessage('email is short'),
        body('password')
            .notEmpty().withMessage('Password is Required')
            .isLength({ min: 3 }).withMessage('Password lenght is short')
    ]
}

export const signupValidator = () => {
    return [
        body('name')
            .notEmpty().withMessage('name is Required')
            .isLength({ min: 3, }).withMessage('name lenght is short'),
            loginValidator(),
    ]
}

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    } 
    const errMessage = errors.array().map(err => err.msg);
    return res.status(422).json({ errMessage });
};