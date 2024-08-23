const express = require("express");
const router = express.Router();
const {
    read,
    list,
    create,
    newUpdate,
    remove,
} = require("../Controllers/product");
const { auth } = require('../Middleware/auth')

router.get("/product",  list);
router.get("/product/:id",  read);
router.post("/product",  create);
router.put("/product/:id",  newUpdate);
router.delete("/product/:id",  remove);
// router.get("/product", auth, list);
// router.get("/product/:id", auth, read);
// router.post("/product", auth, create);
// router.put("/product/:id", auth, newUpdate);
// router.delete("/product/:id", auth, remove);


module.exports = router;
