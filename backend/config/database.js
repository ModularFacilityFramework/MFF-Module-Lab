const mariadb = require('mariadb');

// This module's own database, with its own credentials. Core provisions both at
// Install and keeps them in its single App_backend/.env; coreApi.getModuleConfig()
// hands them over with this module's prefix already stripped. A module never
// reads or holds an .env of its own - see "Database credentials also go through
// getModuleConfig() now" in docs/MFF-Core_module-core-api.md.
module.exports = function createModulePool(config) {
  return mariadb.createPool({
    host: config.DB_HOST || '127.0.0.1',
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    connectionLimit: Number(config.DB_CONNECTION_LIMIT) || 5,
    bigIntAsNumber: true,
    insertIdAsNumber: true
  });
};
