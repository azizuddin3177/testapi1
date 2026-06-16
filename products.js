const mongoose = require("mongoose");
const colectionName = 'products';


const ProductsSchema = new mongoose.Schema(
    {
        name: { type: String, minlength: 5, unique: true },
        brand: String,
        price: Number,
        category: String,
    }
);

const ProductsModel = mongoose.model(colectionName, ProductsSchema);

module.exports = ProductsModel;
