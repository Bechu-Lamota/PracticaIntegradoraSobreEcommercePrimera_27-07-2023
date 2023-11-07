const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const productRouter = require('./router/productsRouter')
const viewsRouter = require('./router/viewsRouter')
const chatRouter = require('./router/chatRouter')
const init = require('./utils/io')

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

app.get('/', (req, res) => {
    return res.render('home')
})

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))


const io = new Server(httpServer)
const users = []
const message = []
io.on('connection', socket => {
	console.log('Nuevo Cliente conectado')
	socket.on('joinChat', username => {
		users.push({
			name: username,
			socketId: socket.id
		})

		socket.broadcast.emit('notification', `${username} se ha unido`)
		socket.emit('notification', `Welcome ${username}`)
		socket.emit('messages', JSON.stringify(messages))
	})

	//Ahora cachamos el mensaje del front end desde el backend:
	socket.on('newMessage', message => {
		const user = users.find(user => user.socketId === socket.id)
		
		const newMessage = {
			message,
			user: user.name
		}
		message.push(newMessage)
		console.log(newMessage)


		io.emit('message', JSON.stringify(newMessage))
	})
})

const chatRouterDB = chatRouter(io)

app.use('/chat', chatRouterDB)