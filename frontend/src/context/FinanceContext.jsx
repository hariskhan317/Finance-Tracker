import { createContext, useContext, useEffect, useState } from "react";
import { addRecordApi, getRecordApi, deleteRecordApi } from '../helper/apiCommunicator';
 
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {

    const [records, setRecords] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const addRecord = async(description, amount, category, paymentMethod, date) => { 
        try {
            const res = await addRecordApi(description, amount, category, paymentMethod, date);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRecord = async(recordId) => { 
        try {
            const res = await deleteRecordApi(recordId);
            return res;
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
    }, [refresh])

    const refreshList = () => {
        setRefresh(prev => !prev); 
    }
    


    const financeValue = {
        records,
        addRecord,
        refreshList,
        deleteRecord,
    };

    return (<FinanceContext.Provider value={financeValue}>{children}</FinanceContext.Provider>)
}

export const useFinance = () => useContext(FinanceContext)