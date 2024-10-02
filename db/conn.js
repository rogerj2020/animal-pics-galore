const MongoClient = require('mongodb').MongoClient;

module.exports = {
  _db: null,
  connect: async function () {
    const mongoHost = process.env['MONGODB_HOST'] ? process.env['MONGODB_HOST'] : "localhost:27017";
    const connectionString = `mongodb://${mongoHost}`;
    const dbName = 'animal_pics_galore_db';
    
    // Create a new MongoClient
    const client = new MongoClient(connectionString);
    let conn;
    try {
      conn = await client.connect();
      this._db = conn.db(dbName);
    } catch (e) {
      console.error(e);
    }
  },

  getDb: async function () {
    if(!this._db){await this.connect();}
    return this._db;
  }
};