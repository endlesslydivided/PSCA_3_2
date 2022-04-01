const express = require("express");
const serviceController = require("../Controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get("/all",serviceController.getServices);
serviceRouter.get("/:id",serviceController.getService);
serviceRouter.post("/add",serviceController.addService);
serviceRouter.put("/update/:id",serviceController.updateService);
serviceRouter.delete("/delete/:id",serviceController.deleteService);

module.exports = serviceRouter;