//const mongoose = require('mongoose')
//const productRouter = require('./router/productsRouter')
//const viewsRouter = require('./router/viewsRouter')
const chatRouter = require('./routers/chatRouter')
const { app } = require('./utils/app')

/*
const MONGODB_CONNECT = 'mongodb+srv://lamota_as:<MongoDBS>@lamota-as.jrmckat.mongodb.net/'
mongoose.connect(MONGODB_CONNECT)
    .then(() => console.log('BD conectada'))
    .catch((e) => console.log(e))
*/

//app.use('/api/products', productRouter)
//app.use('/products', viewsRouter)

app.use(chatRouter)

app.get('/', (req, res) => {
    return res.render('home')
})

app.get('/healtcheck', (req, res) => {
	return res.json ({
		Status: 'Running',
		date: new Date()
	})
})
