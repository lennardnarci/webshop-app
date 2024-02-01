const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

var _db;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      await client.db("topstyle").command({ ping: 1 });
      console.log("Connected to MongoDB!");
    } catch {
      console.dir;
    } finally {
      await client.close();
    }
  },

  getDb: function () {
    return _db;
  },
};
