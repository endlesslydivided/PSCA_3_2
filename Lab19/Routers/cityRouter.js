const express = require("express");
const cityController = require("../Controllers/cityController");
const cityRouter = express.Router();

cityRouter.get("/all",cityController.getCities);
cityRouter.get("/:id",cityController.getCity);
cityRouter.post("/add",cityController.addCity);
cityRouter.put("/update/:id",cityController.updateCity);
cityRouter.delete("/delete/:id",cityController.deleteCity);

module.exports = cityRouter;