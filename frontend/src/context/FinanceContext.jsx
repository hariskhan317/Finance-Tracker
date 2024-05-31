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

    const fetchBudgets = useCallback(async () => {
        try {
            const data = await getBudgetApi();
            setBudgets(data);
            return data;
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    }, []);

    const fetchExpenses = useCallback(async () => {
        try {
            const data = await getExpenseApi();
            setExpenses(data);
            return data;
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }, []);

    const addBudget = useCallback(async (budgetName, budgetAmount, color) => {
        try {
            const data = await addBudgetApi(budgetName, budgetAmount, color);
            fetchBudgets();
            return data;
        } catch (error) {
            console.error("Error adding budget:", error);
        }
    }, [fetchBudgets]);

    const addExpense = useCallback(async (expenseName, budgetName, expenseAmount, date, color) => {
        try {
            const data = await addExpenseApi(expenseName, budgetName, expenseAmount, date, color);
            fetchBudgets();
            fetchExpenses();
            return data;
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    }, [fetchBudgets, fetchExpenses]);

    const deleteExpense = useCallback(async (expenseId) => {
        try {
            const data = await deleteExpenseApi(expenseId);
            fetchBudgets();
            fetchExpenses();
            return data;
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    }, [fetchExpenses]);

    const deleteBudget = useCallback(async (budgetId) => {
        try {
            const data = await deleteBudgetApi(budgetId);
            fetchBudgets();
            return data;
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    }, [fetchBudgets]);

    useEffect(() => {
        fetchBudgets();
        fetchExpenses();
    }, [fetchBudgets, fetchExpenses, auth.isUser]);

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
