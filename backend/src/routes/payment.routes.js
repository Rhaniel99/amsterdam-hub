import { Router } from 'express';

import { createPayment, getPendingPayments } from '../controllers/payment.controller.js';

const router = Router();

router.post('/reg-payments', createPayment);

router.get('/get-payments/pending', getPendingPayments);

export default router;
