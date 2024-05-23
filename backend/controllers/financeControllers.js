import { User } from '../models/userModel.js'


export const createBudget = async(req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        }

        const { budgetName, budgetAmount, expenseAmount, color } = req.body; 

        user.budget.push({ budgetName, budgetAmount, expenseAmount, color });

        await user.save();
    
        return res.status(200).send({status:'200', message: "success", budget: user.budget})
    } catch (error) {
        return res.status(400).send({message: "failed", cause: error.message})
    }
}
 
export const createExpense = async(req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        }

        const { expenseName, budgetName, expenseAmount, date, color } = req.body;
        
        user.expense.push({ expenseName, budgetName, expenseAmount, date, color });
        
        await user.save();
    
        return res.status(200).send({status:'200', message: "success", user})
    } catch (error) {
        return res.status(400).send({message: "failed", cause: error.message})
    }
}

export const getBudget = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        }
        const { expense, budget } = user;

        // Create a map to store the total expenses for each budget
        const expenseMap = expense.reduce((acc, expense) => {
            if (acc[expense.budgetName]) {
                acc[expense.budgetName] += expense.expenseAmount;
            } else {
                acc[expense.budgetName] = expense.expenseAmount;
            }
            return acc;
        }, {});

        // Add the expense amount to the corresponding budget
        const updatedBudgets = budget.map(budget => {
            const expenseAmount = expenseMap[budget.budgetName] || 0;
            return {
                ...budget._doc, // Spread the existing budget properties
                expenseAmount // Add the calculated expense amount
            };
        });

        return res.status(200).send(updatedBudgets);
    } catch (error) {
        return res.status(400).send({ message: "failed", cause: error.message });
    }
}

export const getExpense = async(req, res) => {
    try {

        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        } 
        return res.status(200).send(user.expense)
    } catch (error) {
        return res.status(400).send({message: "failed", cause: error.message})
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        }

        const { expense } = user; 
        const expenseId = req.params.expenseId;

        const findExpenseToDelete = expense.find(expenseItem => expenseItem.id === expenseId);

        if (!findExpenseToDelete) {
            return res.status(422).send({ message: "Couldn't find the budget" });
        }

        const expenseToDelete = expense.filter(expenseItem => expenseItem.id !== expenseId);

        user.expense = expenseToDelete;
        await user.save();

        return res.status(200).send({ message: "Successfully deleted" });

    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Failed", cause: error.message });
    }
};

export const deleteBudget = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        
        if (!user) {
            return res.status(422).send("Can't find the User");
        }

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(422).send("Couldn't match");
        }

        const { budget } = user; 
        const budgetId = req.params.budgetId;
        
        const findBudgetToDelete = budget.find(budgetItem => budgetItem.id === budgetId);

        console.log(findBudgetToDelete)
        if (!findBudgetToDelete) {
            return res.status(422).send({ message: "Couldn't find the budget" });
        }

        const budgetToDelete = budget.filter(budgetItem => budgetItem.id !== budgetId);

        user.budget = budgetToDelete;
        await user.save();

        return res.status(200).send({ message: "Successfully deleted" });

    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Failed", cause: error.message });
    }
};