const express = require("express");
const customerController = require("../Controllers/customerController");
const customerRouter = express.Router();

customerRouter.get("/all",customerController.getCustomers);
customerRouter.get("/:id",customerController.getCustomer);
customerRouter.post("/add",customerController.addCustomer);
customerRouter.put("/update/:id",customerController.updateCustomer);
customerRouter.delete("/delete/:id",customerController.deleteCustomer);

module.exports = customerRouter;