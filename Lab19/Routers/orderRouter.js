const express = require("express");
const orderController = require("../Controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/all",orderController.getOrders);
orderRouter.get("/:id",orderController.getOrder);
orderRouter.post("/add",orderController.addOrder);
orderRouter.put("/update/:id",orderController.updateOrder);
orderRouter.delete("/delete/:id",orderController.deleteOrder);

module.exports = orderRouter;