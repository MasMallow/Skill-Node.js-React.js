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
router.get("/read/:id",auth, read);
router.post("/create", auth, create);
router.put("/newUpdate/:id",auth, newUpdate);
router.delete("/remove/:id",auth, remove);
router.get("/search",auth, search);

module.exports = router;
