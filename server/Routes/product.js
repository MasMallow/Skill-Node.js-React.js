const express = require("express");
const router = express.Router();
const {
    read,
    list,
    create,
    newUpdate,
    remove,
    search
} = require("../Controllers/product");
const {auth} = require("../Middleware/auth")

router.get("/product",auth, list);
router.get("/product/:id",auth, read);
router.post("/product", auth, create);
router.put("/product/:id",auth, newUpdate);
router.delete("/product/:id",auth, remove);
router.get("/search/product",auth, search);

module.exports = router;
