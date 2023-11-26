const { Schema, model } = require('mongoose')

const cartSchema = Schema({
    id: String,
    products: {
        type:[
            {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
                },
            quantity: {
                type: Number,
                default: 1
                },
            }
        ],
        default: []
    },
})

module.exports = model('carts', cartSchema)