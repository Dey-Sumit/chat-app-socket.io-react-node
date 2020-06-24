import React from 'react'
import '../infobar/infoBar.css'

import closeIcon from '../../icons/closeIcon.png'

import onlineIcon from '../../icons/onlineIcon.png'

export const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="online" className="onlineIcon" />
                <h3> {room} </h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="closeIcon" />
                </a>
            </div>
        </div>
    )
}