import { Router } from 'express' 
import { createBudget, getBudget, createExpense, getExpense, deleteExpense, deleteBudget } from '../controllers/financeControllers.js'
import { verifyToken } from "../utils/tokenManager.js";
import { budgetValidator, expenseValidator, validate } from '../utils/validation.js';

const financeRoutes = Router(); 

financeRoutes.get('/getBudget', verifyToken, getBudget); 
financeRoutes.get('/getExpense',verifyToken, getExpense);
financeRoutes.post('/create-budget', verifyToken, budgetValidator(), validate, createBudget); 
financeRoutes.post('/add-expense', verifyToken, expenseValidator(), validate, createExpense); 
financeRoutes.delete('/delete-expense/:expenseId', verifyToken, deleteExpense);
financeRoutes.delete('/delete-budget/:budgetId', verifyToken, deleteBudget);

export default financeRoutes;