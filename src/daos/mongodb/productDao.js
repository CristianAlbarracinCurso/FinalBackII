import MongoDao from "./mongoDao.js";
import { ProductModel } from "./models/productModel.js";

class ProductDaoMongo extends MongoDao {
  constructor() {
    super(ProductModel);
  }
}

export const prodDaoMongo = new ProductDaoMongo();
