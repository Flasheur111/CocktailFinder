// Don't touch that
var config = {};
config.app = {};

// CONFIG START
// Server port on which the server will be run
config.app.port							= 3000;

// Database authentification parameters
config.app.db = {};
config.app.db.endpoint					= "192.168.50.21:7474/db/data/transaction/commit";
config.app.db.username					= "neo4j";
config.app.db.password					= "secret";

// Don't touch that
module.exports = config;