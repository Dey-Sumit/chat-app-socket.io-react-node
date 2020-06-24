import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../join/join.css'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const handleNameChange = (event) => setName(event.target.value)
    const handleRoomChange = (event) => setRoom(event.target.value)

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome to chat app</h1>
                <div><input placeholder='name' type="text" className='joinInput' onChange={handleNameChange} /></div>
                <div><input placeholder='room' type="text" className='joinInput' onChange={handleRoomChange} /></div>
                <Link onClick={
                    event => (!name || !room) ? event.preventDefault() : null
                }
                    to={`chat?name=${name}&room=${room}`} >
                    <button className="button mt-20">
                        Join
                </button>
                </Link>

            </div>
        </div>

    )
}
export default Join
