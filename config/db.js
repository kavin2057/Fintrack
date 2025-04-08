const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
} catch (error) {
  console.error("Connection error:", error);
}

module.exports = sequelize;
