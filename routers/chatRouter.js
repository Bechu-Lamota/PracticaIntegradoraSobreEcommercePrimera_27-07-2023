const { Router } = require('express')
const { io } = require('../utils/app')

const chatRouter = new Router()
const usersnames = []

chatRouter.get('/login', (req, res) => {
	return res.render('login')
})

chatRouter.post('/login', (req, res) => {
	const user = req.body
	const username = user.name

	usersnames.push(username)//una vez que agregamos el usuario a la BD
	io.emit('newUser', username) // con el broadcast.emit del server ya estamos haciendo esto//Estamos mandando que se emita un nuevo usuario 

	return res.redirect(`/chat?username=${username}`)//`/chat?username=${userName}`=> es para que se vea en el buscador el usuario sino con ('chat') ya estaba bien.
})

chatRouter.get('/chat', (req, res) => {
	return res.render('index')
})

module.exports = chatRouter