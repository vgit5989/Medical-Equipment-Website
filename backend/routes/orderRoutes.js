import express from 'express';
import {
	addOrderItems,
	getOrderByID,
	updateOrderPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderControllers.js';
import { protect, admin } from '../middleware/autMiddleware.js';

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
