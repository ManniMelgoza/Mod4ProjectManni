// backend/config/database.js
const config = require('./index');

module.exports = {
  development: {
    // where to look for the database
    // ORIGINAL CODE
    storage: config.dbFile,
    //what type of db connecting to
    dialect: "sqlite",
    //what seeder files have being raned
    seederStorage: "sequelize",
    //log values as paramaters if not it will be loged with $1 ect
    logQueryParameters: true,
    // makes sure that the items that are being added to the bd are of the same type from the
    typeValidation: true
  },
  // This will be used when the project is in production with the actual hosting database
  production: {
    // this is where the hosting url will go to deploy the project
    use_env_variable: 'DATABASE_URL', //render will use this later on
    // dialect: 'sequelize',
    dialect: 'postgres', //original
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};
