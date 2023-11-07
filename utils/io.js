const { Server } = require('socket.io')

const init = (httpServer) => {
	const io = new Server(httpServer)//Es nuestro server

	io.on('connection', socket => { //Este puede estar acá o en server.js
		console.log('Nuevo Cliente conectado', socket.id)
	})

	return io
}

module.exports = init