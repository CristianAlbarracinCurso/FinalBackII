import FSDao from "./fsDao.js";
const path = "./products.json";

class ProductDaoFS extends FSDao {
  constructor() {
    super(path);
  }
}

export const prodDaoFS = new ProductDaoFS();
