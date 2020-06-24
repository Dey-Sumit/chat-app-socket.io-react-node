const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000;

const app = express()

//The http.createServer() method turns your computer into an HTTP server.
const server = http.createServer(app)
const io = socketio(server)
const router = require('./router');
const { log } = require('console');

app.use(router)
app.use(cors())

// when we get an client connection on our socket io instance
io.on(
    'connection', (socket) => {
        console.log("got a new connection");
        socket.on('join', ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room })
            console.log(user);

            if (error) {
                console.log("got an error");

                //this callback is for error handling
                //it sends this data to the client
                callback(error)
            }
            socket.emit('message', { user: 'admin', text: `Hi ${user.name},I am Sumit, Welcome to the room ${user.room} ` })

            // broadcast send a message everyone except this user  to():targets a specific room
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} joined the room ` })

            // if not error ; call join (built in funtion to join a room)
            socket.join(user.room)

            callback() // for the front end if needed
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        })

        // this comes from frontend
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id)
            console.log(user, message);

            // send this messge to the room using to()
            io.to(user.room).emit('message', { user: user.name, text: message })

            callback()// do something on the frontend after emits 
        })

        socket.on('disconnect', () => {
            const user = removeUser(socket.id)

            console.log("disconnect", user);

            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} left the room` })
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
            }
        })
    }
)




server.listen(PORT, () => console.log(`server is running on port ${PORT}`))
