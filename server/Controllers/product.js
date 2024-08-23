const Product = require("../Models/Product");

//อ่าน
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const producted = await Product.findOne({ _id: id }).exec();
        if (!producted) {
            return res.status(404).send("Product not found");
        }
        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

//ดู
exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec();

        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

// สร้าง
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const producted = await Product(req.body).save();
        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

// อัปเดต
exports.newUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

// ลบ
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removed = await Product.findOneAndDelete({ _id: id }).exec();
        res.send(removed);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};
