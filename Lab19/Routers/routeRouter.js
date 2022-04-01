const express = require("express");
const routeController = require("../Controllers/routeController");
const routeRouter = express.Router();

routeRouter.get("/all",routeController.getRoutes);
routeRouter.get("/:id",routeController.getRoute);
routeRouter.post("/add",routeController.addRoute);
routeRouter.put("/update/:id",routeController.updateRoute);
routeRouter.delete("/delete/:id",routeController.deleteRoute);

module.exports = routeRouter;