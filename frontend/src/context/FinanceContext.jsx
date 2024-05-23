import { createContext, useContext, useEffect, useState } from "react";
import { addBudgetApi, getBudgetApi, addExpenseApi, getExpenseApi, deleteExpenseApi, deleteBudgetApi } from '../helper/apiCommunicator';
 
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const addBudget = async(budgetName, budgetAmount, color) => { 
        try {
            const res = await addBudgetApi(budgetName, budgetAmount, color);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const addExpense = async(expenseName, budgetName, expenseAmount, date, color) => { 
        try {
            const res = await addExpenseApi(expenseName, budgetName, expenseAmount, date, color);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        const getBudgetList = async () => {
            try {
                const data = await getBudgetApi(); 
                setBudgets(data); 
                return data;
            } catch (error) {
                console.log(error);
            }
        }
        getBudgetList();

        const getExpenseList = async () => {
            try {
                const data = await getExpenseApi(); 
                setExpenses(data); 
                return data;
            } catch (error) {
                console.log(error);
            }
        }
        getExpenseList();
    }, [refresh])

    const deleteExpense = async(expenseId) => { 
        try {
            const res = await deleteExpenseApi(expenseId);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBudget = async (budgetId) => {
        try {
            const res = await deleteBudgetApi(budgetId);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const refreshList = () => {
        setRefresh(prev => !prev); 
    }

    const financeValue = {
        budgets,
        expenses,
        addBudget,
        refreshList,
        addExpense,
        deleteExpense, 
        deleteBudget,
    };

    return (<FinanceContext.Provider value={financeValue}>{children}</FinanceContext.Provider>)
}

export const useFinance = () => useContext(FinanceContext)