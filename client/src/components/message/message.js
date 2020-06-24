import React from 'react'

import './message.css'

let isSentByCurrentUser;
export const Message = ({ message: { user, text }, name }) => {
    isSentByCurrentUser = false
    let trimmedName = name.trim()
    if (user === trimmedName)
        isSentByCurrentUser = true

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{text} </p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{text} </p>
                    </div>
                    <p className="sentText pl-10">{user}</p>
                </div>

            )
    )
}