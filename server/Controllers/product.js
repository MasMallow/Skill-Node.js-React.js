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
        const productData = { ...req.body, addedBy: req.userName };
        const product = await Product(productData).save();
        res.status(201).json(product);
        console.log(product)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
};

// อัปเดต
exports.newUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        }).exec();
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

exports.search = async (req, res) => {
    try {
        const searchTerm = req.query.term;

        // ตรวจสอบว่ามีคำค้นหาหรือไม่
        if (!searchTerm || searchTerm.trim() === "") {
            return res.status(400).send("กรุณาระบุคำค้นหา");
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },  // ค้นหาชื่อที่ไม่สนใจตัวพิมพ์เล็ก-ใหญ่
                { detail: { $regex: searchTerm, $options: "i" } }, // ค้นหารายละเอียดที่ไม่สนใจตัวพิมพ์เล็ก-ใหญ่
            ],
        });

        // ถ้าไม่พบสินค้า
        if (!products.length) {
            return res.status(404).send("ไม่พบข้อมูล");
        }

        res.json(products); // ส่งกลับรายการสินค้าที่ค้นพบ
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).send("เกิดข้อผิดพลาดในการค้นหาสินค้า");
    }
};