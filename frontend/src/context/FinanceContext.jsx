import { createContext, useContext, useEffect, useState } from "react";
import { addBudgetApi, getBudgetApi, addExpenseApi, getExpenseApi, deleteExpenseApi, deleteBudgetApi } from '../helper/apiCommunicator';
import { useAuth } from "./AuthContext";
 
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
    const auth = useAuth();
    console.log('userrr', auth.isUser);
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const getBudgetList = async () => {
        try {
            const data = await getBudgetApi(); 
            setBudgets(data); 
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getExpenseList = async () => {
        try {
            const data = await getExpenseApi(); 
            setExpenses(data); 
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const addBudget = async(budgetName, budgetAmount, color) => { 
        try {
            const res = await addBudgetApi(budgetName, budgetAmount, color);
            getBudgetList();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const addExpense = async(expenseName, budgetName, expenseAmount, date, color) => { 
        try {
            const res = await addExpenseApi(expenseName, budgetName, expenseAmount, date, color);
            getBudgetList();
            getExpenseList();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteExpense = async(expenseId) => { 
        try {
            const res = await deleteExpenseApi(expenseId);
            getExpenseList();
            return res; 
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBudget = async (budgetId) => {
        try {
            const res = await deleteBudgetApi(budgetId);
            getBudgetList();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        getBudgetList();
        getExpenseList();

    },[auth.isUser])



    const financeValue = {
        budgets,
        expenses,
        addBudget,
        addExpense,
        deleteExpense, 
        deleteBudget,
    };

    return (<FinanceContext.Provider value={financeValue}>{children}</FinanceContext.Provider>)
}

export const useFinance = () => useContext(FinanceContext)