import { Budget } from '../models/budgetModel.js'; 
import { Expense } from '../models/expenseModel.js'


export const createBudget = async(req, res) => {
    try {
        const { budgetName, amount, color } = req.body; 

        const budget = new Budget({budgetName, amount, color})
        await budget.save();
    
        return res.status(200).send({status:'200', message: "success", budget})
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}

export const getBudget = async (req, res) => {
    try {
        const budgets = await Budget.find();  
        return res.status(200).send(budgets);
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}
 
export const addExpense = async(req, res) => {
    try {
        const { expenseName, budgetName, amount, date, color } = req.body; 

        const expense = new Expense({expenseName, budgetName, amount, date, color})
        await expense.save();
    
        return res.status(200).send({status:'200', message: "success", expense})
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}

export const getExpense = async(req, res) => {
    try {
        const expenses = await Expense.find();
    
        return res.status(200).send(expenses)
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.expenseId;

        // Find the record by ID to ensure it exists
        const expenseToDelete = await Expense.findById(expenseId);
        if (!expenseToDelete) {
            return res.status(422).send({ message: "Couldn't find the expense" });
        }

        // Delete the record
        await Expense.findByIdAndDelete(expenseId);

        // Fetch the updated list of records
        const updatedExpense = await Expense.find();

        console.log({ expenseId });
        console.log({ updatedExpense });

        return res.status(200).send({ message: "Successfully deleted", expenses: updatedExpense });

    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Failed", cause: error.message });
    }
};
