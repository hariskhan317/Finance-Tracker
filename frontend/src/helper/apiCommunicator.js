import axios from 'axios';

export const userApiSignup = async (name, email, password) => {
    try {
        const response = await axios.post('/user/signup', { name, email, password });
        const data = response.data;
        if (data.status !== 200) {
            throw new Error("unable to signup")
        } 
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const checkAuthStatus = async() => {
    try {
        const response = await axios.get('/user/auth-status');
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const userApiLogin = async (email, password) => {
    try {
        const response = await axios.post('/user/login', { email, password });
        const data = response.data;
        if (data.status !== 200) {
            throw new Error("unable to login")
        } 
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const userLogout = async() => {
    try {
        const response = await axios.get('/user/logout');
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const addBudgetApi = async(budgetName, amount, color) => {
    try {
        const res = await axios.post('/financial-records/create-budget', { budgetName, amount, color });
        return res;
    } catch (error) {
        console.log(error)
    } 
} 

export const getBudgetApi = async() => {
    try {
        const response = await axios.get('/financial-records/getBudget');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const getExpenseApi = async() => {
    try {
        const response = await axios.get('/financial-records/getExpense');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const addExpenseApi = async(expenseName, budgetName, amount, date, color) => {
    try {
        const res = await axios.post('/financial-records/add-expense', { expenseName, budgetName, amount, date, color });
        return res;
    } catch (error) {
        console.log(error)
    } 
} 

export const deleteExpenseApi = async(expenseId) => {
    try {
        const res = await axios.delete(`/financial-records/delete-expense/${expenseId}`);
        return res;
    } catch (error) {
        console.log(error)
    } 
} 


// export const getRecordApi = async() => {
//     try {
//         const response = await axios.get('/financial-records/');
//         const data = response.data;
//         return data;
//     } catch (error) {
//         console.log(error)
//     } 
// } 

// export const addRecordApi = async (description, amount, category, paymentMethod, date) => {
//     try {
//         const res = await axios.post(`/financial-records/add-record`, { description, amount, category, paymentMethod, date });
//         return res;
//     } catch (error) {
//         console.log(error)
//     } 
// } 

// export const deleteRecordApi = async(recordId) => {
//     try {
//         const res = await axios.delete(`/financial-records/delete-record/${recordId}`);
//         return res;
//     } catch (error) {
//         console.log(error)
//     } 
// } 