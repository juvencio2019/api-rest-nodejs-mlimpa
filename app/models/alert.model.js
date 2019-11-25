const sql = require("./db.js");

// constructor
const Alert = function(alert) {
  this.type = alert.type;
  this.description = alert.description;
  this.image = alert.image;
  this.address = alert.address;
  this.lat = alert.lat;
  this.lng = alert.lng;
};

Alert.create = (newAlert, result) => {
  sql.query("INSERT INTO alerts SET ?", newAlert, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created alert: ", { id: res.insertId, ...newAlert });
    result(null, { id: res.insertId, ...newAlert });
  });
};

Alert.findById = (alertId, result) => {
  sql.query(`SELECT * FROM alerts WHERE id = ${alertId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found alert: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Alert with the id
    result({ kind: "not_found" }, null);
  });
};

Alert.getAll = result => {
  sql.query("SELECT * FROM alerts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("alerts: ", res);
    result(null, res);
  });
};

Alert.updateById = (id, alert, result) => {
  sql.query(
    "UPDATE alerts SET type = ?, description = ?, image = ?, address = ?, lat = ?, lng = ? WHERE id = ?",
    [alert.type, alert.description, alert.image, alert.address, alert.lat, alert.lng, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alert with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated alert: ", { id: id, ...alert });
      result(null, { id: id, ...alert });
    }
  );
};

Alert.remove = (id, result) => {
  sql.query("DELETE FROM alerts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Alert with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted alert with id: ", id);
    result(null, res);
  });
};

Alert.removeAll = result => {
  sql.query("DELETE FROM alerts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alerts`);
    result(null, res);
  });
};

module.exports = Alert;