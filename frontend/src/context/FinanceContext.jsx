import { createContext, useContext, useEffect, useState } from "react";
import { addRecordApi, getRecordApi } from '../helper/apiCommunicator';
 
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {

    const [records, setRecords] = useState([]);

    const addRecord = async(description, amount, category, paymentMethod) => { 
        try {
            await addRecordApi(description, amount, category, paymentMethod);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        const getRecord = async () => {
            try {
                const data = await getRecordApi(); 
                setRecords(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
        getRecord();
    },[getRecordApi])


    const financeValue = {
        records,
        addRecord,
    };

    return (<FinanceContext.Provider value={financeValue}>{children}</FinanceContext.Provider>)
}

export const useFinance = () => useContext(FinanceContext)