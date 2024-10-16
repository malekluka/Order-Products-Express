const Product = require('../models/product');

function index(req,res) {
    Product.find({})
    .select('name _id')
    .then(products => {
        if (products.length > 0){
            res.status(200)
            .json({
                message : "Products Retrieved Successfully!",
                method : "GET",
                url : "http://localhost:8000/products",
                statusCode : 200,
                totalResult : products.length,
                products : products 
            })
        } else {
            res.status(404).json({
                message : "No products Found"
            })

        }
    }).catch(error => {
        res.status(500).json({
            error : error.message
        })
    })
}

function show(req,res) {
    const id = req.params.id
    Product.findById(id)
    .then(product => {
        if(!product) {
            res.status(404).json({
                message : "Error 404 Product Not Found"
            })
        } else {
            res.status(200).json({
                method : "GET",
                url : `http://localhost:8000/products/${id}`,
                statusCode : 200,
                product : product
            })
        }
    }).catch(error => {
        res.status(500).json({
            error : error
        })
    })
}

function storeProduct(req,res) {
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        vendor : req.body.vendor
    });
    product.save().then((product) => {
        if(product) {
        res.status(201)
        .json({
            message : "Product Added Successfully!",
            method : "POST",
            url : "http://localhost:8000/products",
            statusCode : 201,
            product : product 
        })
    } else {
        res.status(404).json({
            message : "Error 404 Product Not Found!"
        })
    }
    }).catch(error => {
        res.status(500)
        .json({
            error : error
        })
    })
}

function updateProduct(req,res) {
    const id = req.params.id
    Product.findByIdAndUpdate(id , {$set : req.body})
    .then(product => {
        if(product){
            res.status(200).json({
                method : "PUT",
                url : `http://localhost:8000/products/${id}`,
                statusCode : 200,
                product : product
            })
        } else {
            res.status(404).json({
                message : "Error 404 Product Not Found!"
            })
        }
    }).catch(error => {
        res.status(500).json({
            error : error.message
        })
    })
}

function destroy(req,res) {
    const id = req.params.id
    Product.findByIdAndDelete(id)
    .then(product => {
        if(product){
            res.status(200).json({
                method : "DELETE    ",
                url : `http://localhost:8000/products/${id}`,
                statusCode : 200,
                product: product
            })
        } else {
            res.status(404).json({
                message : "Error 404 Product Not Found!"
            })
        }
    }).catch(error => {
        res.status(500).json({
            error : error.message
        })
    })
}

module.exports = {
    index,
    show,
    storeProduct,
    updateProduct,
    destroy
}