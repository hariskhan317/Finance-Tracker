import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { 
    addBudgetApi, 
    getBudgetApi, 
    addExpenseApi, 
    getExpenseApi, 
    deleteExpenseApi, 
    deleteBudgetApi 
} from '../helper/apiCommunicator';
import { useAuth } from "./AuthContext";

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
    const auth = useAuth();
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (auth.isUser) {
            fetchBudgets();
            fetchExpenses();
        }
    }, [auth.isUser, fetchBudgets, fetchExpenses]);

    const fetchBudgets = useCallback(async () => {
        try {
            const data = await getBudgetApi();
            setBudgets(data);
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    }, []);

    const fetchExpenses = useCallback(async () => {
        try {
            const data = await getExpenseApi();
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }, []);

    const addBudget = useCallback(async (budgetName, budgetAmount, color) => {
        try {
            await addBudgetApi(budgetName, budgetAmount, color);
            fetchBudgets();
        } catch (error) {
            console.error("Error adding budget:", error);
        }
    }, [fetchBudgets]);

    const addExpense = useCallback(async (expenseName, budgetName, expenseAmount, date, color) => {
        try {
            await addExpenseApi(expenseName, budgetName, expenseAmount, date, color);
            fetchBudgets();
            fetchExpenses();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    }, [fetchBudgets, fetchExpenses]);

    const deleteExpense = useCallback(async (expenseId) => {
        try {
            await deleteExpenseApi(expenseId);
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    }, [fetchExpenses]);

    const deleteBudget = useCallback(async (budgetId) => {
        try {
            await deleteBudgetApi(budgetId);
            fetchBudgets();
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    }, [fetchBudgets]);

    const financeValue = {
        budgets,
        expenses,
        addBudget,
        addExpense,
        deleteExpense,
        deleteBudget,
    };

    return (
        <FinanceContext.Provider value={financeValue}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
