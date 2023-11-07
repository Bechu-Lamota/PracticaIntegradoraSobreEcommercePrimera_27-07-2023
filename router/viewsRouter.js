const {Router} = require('express')
const ProductManager = require('../Dao/manager/productManager')
const productManager = new ProductManager()
const productsViewsRouter = Router()


productsViewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    res.render('products/products', {products})
})

module.exports = productsViewsRouter