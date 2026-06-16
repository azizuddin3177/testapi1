const mongoose = require('mongoose');
require("./config.js");
const products = require("./products");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/create", async (req, res) => {
    try {
        let data = new products(req.body);
        let result = await data.save();

        res.status(201).send(result); // success response
        console.log("ok");

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error saving product",
            error: error.message
        });
    }
});

app.get("/list", async (req, res) => {
    try {
        let data = await products.find(); // if using MongoDB native driver
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
});

// app.put("/update", async (req, res) => {
//     let data = await products.updateOne(
//         { name: "Galaxy" },
//         { $set: { price: 222 } }
//     )
//     res.send("updated ")
// })

app.delete("/delete/:_id", async (req, res) => {
    
    try {
        let result = await products.deleteOne(
            { _id: req.params._id }
        );

        if (result.deletedCount === 0) {
            return res.status(404).send("No product found to delete");
        }

        res.send({
            success: true,
            message: "Product deleted",
            result
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).send({
            success: false,
            message: "Delete failed",
            error: error.message
        });
    }
});


// app.patch("/", async (req, res) => {
//     await products.updateOne(
//         { name: "Iphone 12" },
//         { $set: { price: 320, brand: "Apple" }, }
//     )
//     res.send('Updated')
// })

//for search

// app.get("/search/:key", async (req,res)=>{

//     let result = await products.find(
//         {
//             $or:[
//                 {"name":{$regex:req.params.key}},
//                 {"brand":{$regex:req.params.key}},
                
//             ]
//         }
//     );

//     console.log(req.params.key)
//     console.log(req.params.key)
//     res.send(result)
// })

app.listen(3000);