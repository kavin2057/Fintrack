'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

const db = {};

let sequelize;

// Initialize Sequelize with environment variables or config
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  console.log('✅ Database connection established successfully.');
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
  process.exit(1);
}

// Dynamically load all models from the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files (e.g., .env)
      file !== basename && // Ignore this file (index.js)
      file.endsWith('.js') && // Only include JavaScript files
      !file.includes('.test.js') && // Exclude test files
      !file.includes('migration') && // Exclude migration files
      !file.includes('seed') // Exclude seed files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add model to db object
  });

// Set up model associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach Sequelize instance and class to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
