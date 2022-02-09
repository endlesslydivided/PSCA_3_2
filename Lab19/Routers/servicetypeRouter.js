const express = require("express");
const servicetypeController = require("../Controllers/servicetypeController");
const servicetypeRouter = express.Router();

servicetypeRouter.get("/all",servicetypeController.getServiceTypes);
servicetypeRouter.get("/:id",servicetypeController.getServiceType);
servicetypeRouter.post("/add",servicetypeController.addServiceType);
servicetypeRouter.put("/update/:id",servicetypeController.updateServiceType);
servicetypeRouter.get("/delete/:id",servicetypeController.deleteServiceType);

module.exports = servicetypeRouter;