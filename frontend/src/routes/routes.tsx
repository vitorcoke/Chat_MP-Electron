import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginChat from '../pages/loginChat'
import Chat from '../pages/Chat'


const Router = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginChat}/>
            <Route path='/Chat' component={Chat}/>
        </Switch>
    </BrowserRouter>
)

export default Router