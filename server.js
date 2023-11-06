const express = require('express')
const productRouter = require('./router/productsRouter')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const viewsRouter = require('./router/viewsRouter')

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + 'views')
app.set('view engine', 'handlebars')

const MONGODB_CONNECT = 'mongodb'// 'mongodb: Acá debo pegar toda la url de mongoDb. Mi BD.'
mongoose.connect(MONGODB_CONNECT)
    .then(() => console.log('BD conectada'))
    .catch((e) => console.log(e))


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('public'))

app.use('/api/products', productRouter)
app.use('/products', viewsRouter)



const PORT = 8080
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

app.get('/', (req, res) => {
    return res.json({
        Status: 'running',
        Date: new Date(),
        Greeting: 'Welcome'
    })
})