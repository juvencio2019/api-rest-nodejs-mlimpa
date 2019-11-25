module.exports = app => {
    const alerts = require("../controllers/alert.controller.js");
  
    // Create a new Alert
    app.post("/alerts", alerts.create);
  
    // Retrieve all Alerts
    app.get("/alerts", alerts.findAll);
  
    // Retrieve a single Alert with alertId
    app.get("/alerts/:alertId", alerts.findOne);
  
    // Update a Alert with alertId
    app.put("/alerts/:alertId", alerts.update);
  
    // Delete a Alert with alertId
    app.delete("/alerts/:alertId", alerts.delete);
  
    // Create a new Alert
    app.delete("/alerts", alerts.deleteAll);
  };