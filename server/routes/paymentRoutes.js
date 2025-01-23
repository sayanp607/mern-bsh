import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payment/create-order', createOrder); // Create Razorpay order
router.post('/payment/verify-payment', verifyPayment); // Verify Razorpay payment

export default router;
