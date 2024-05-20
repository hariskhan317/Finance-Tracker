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

export const recordValidator = () => {
    return [
        body('description')
            .notEmpty().withMessage('description is Required')
            .isLength({ min: 3, }).withMessage('Description lenght is short'),
        body('amount') 
            //.isNumeric().withMessage('only String is allowed')
            .notEmpty().withMessage('amount is Required'),
        body('category')
            .isString().withMessage('only String is allowed')
            .notEmpty().withMessage('category is Required'),
        body('paymentMethod')
            .isString().withMessage('only String is allowed')
            .notEmpty().withMessage('paymentMethod is Required'),
        body('date') 
            .notEmpty().withMessage('date is Required'),
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