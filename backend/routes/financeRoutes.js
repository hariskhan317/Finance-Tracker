import { Router } from 'express'
import { getRecord, addRecord, deleteRecord } from '../controllers/financeControllers.js'
import { verifyToken } from "../utils/tokenManager.js";
import { recordValidator, validate } from '../utils/validation.js';

const financeRoutes = Router();
financeRoutes.get('/',verifyToken, getRecord);
financeRoutes.post('/add-record', verifyToken, recordValidator(), validate, addRecord);
financeRoutes.delete('/delete-record/:recordId',verifyToken, deleteRecord);

export default financeRoutes;