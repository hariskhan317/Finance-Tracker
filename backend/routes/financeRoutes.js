import { Router } from 'express'
import { getRecord, addRecord } from '../controllers/financeControllers.js'
import { verifyToken } from "../utils/tokenManager.js";
import { recordValidator, validate } from '../utils/validation.js';

const financeRoutes = Router();
financeRoutes.get('/',verifyToken, getRecord);
financeRoutes.post('/add-record',verifyToken, recordValidator(), validate, addRecord);

export default financeRoutes;