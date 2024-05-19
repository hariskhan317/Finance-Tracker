import { createContext, useContext, useState } from "react";


const FinanceContext = createContext(null);

export const FinanceProvider = ({ childern }) => {
    


    const value = {};

    return (<FinanceContext.Provider value={value}>{ childern}</FinanceContext.Provider>)
}

export const useFinance = () => useContext(FinanceContext)