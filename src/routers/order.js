import { Router } from "express";
import { createOrder, get_order, get_Order_ById, get_order_Id, update_status } from "../controllers/order.js";
const Router_order = Router();
Router_order.post('/order', createOrder)
Router_order.get('/order', get_order)
Router_order.get('/orders/:id', get_order_Id)
Router_order.get('/order/:userId', get_Order_ById)
Router_order.put('/order/:id/status', update_status)
export default Router_order;