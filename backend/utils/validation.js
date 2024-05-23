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

export const budgetValidator = () => {
    return [
        body('budgetName')
            .notEmpty().withMessage('Budget is Required')
            .isLength({ min: 3, }).withMessage('Budget lenght is short'),
        body('budgetAmount')  
            .notEmpty().withMessage('Budget Amount is Required')
            .isNumeric().withMessage('Budget Amount must be number'),
        body('color')  
            .notEmpty().withMessage('color is Required'),
    ]
}

export const expenseValidator = () => {
    return [
        body('expenseName')
            .notEmpty().withMessage('Expense is Required')
            .isLength({ min: 3, }).withMessage('Expense lenght is short'),
        body('budgetName')
            .notEmpty().withMessage('Budget is Required')
            .isLength({ min: 3, }).withMessage('Budget lenght is short'),
        body('expenseAmount')  
            .notEmpty().withMessage('Expense Amount is Required')
            .isNumeric().withMessage('Expense Amount must be number'), 
        body('date')  
            .notEmpty().withMessage('Date is Required'), 
        body('color')  
            .notEmpty().withMessage('color is Required'), 
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