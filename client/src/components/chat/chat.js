import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import { InfoBar } from '../infobar/infoBar'
import { Input } from '../input/input'
import { Messages } from '../messages/messages'
import { TextContainer } from '../textContainer/textContainer'

import '../chat/chat.css'

let socket;

//**  unique socket generates for unique user ; so we can get the user by it's socket.id
const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [roomUsers, setRoomUsers] = useState([])

    const ENDPOINT = 'http://localhost:5000/'

    // location comes from router and passed as a prop to it's component(s)
    useEffect(() => {

        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        //emits an event(event name van be anything) with data;server will capture this event and process it
        socket.emit('join', { name, room }, () => {
            // this error comes from server


        }) //ES6 syntax=? {name:name,room:room} = {name,room} when key and value are samed name


        // component did unmount
        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {

        // listen to 'message' event
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', (roomData) => setRoomUsers(roomData.users)
        )
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()

        socket.emit('sendMessage', message, () => setMessage(''))

    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            <TextContainer users={roomUsers} />
        </div>
    )
}
export default Chat