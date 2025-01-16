import { prodDaoFS } from "./filesystem/productDao.js";
import { prodDaoMongo } from "./mongodb/productDao.js";
import { userDaoMongo } from "./mongodb/userDao.js";
import { initMongoDB } from "./mongodb/db/connection.js";
import { userDaoFS } from "./filesystem/userDao.js";

let userDao = null;
let prodDao = null;
let persistence = process.argv[2];

switch (persistence) {
  case "fs":
    userDao = userDaoFS;
    prodDao = prodDaoFS;
    console.log(persistence);
    break;

  case "mongo":
    initMongoDB()
      .then(() => console.log("base de datos MONGO coenctada"))
      .catch((error) => console.log(error));
    userDao = userDaoMongo;
    prodDao = prodDaoMongo;
    console.log(persistence);
    break;
  default:
    userDao = userDaoFS;
    prodDao = prodDaoFS;
    break;
}

export default { userDao, prodDao };
