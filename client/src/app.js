import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/join/join'
import Chat from './components/chat/chat'

export const App = () => {
    return (
        <Router>
            <Route path='/' exact component={Join} />
            <Route path='/chat' component={Chat} />
        </Router>
    )
}
