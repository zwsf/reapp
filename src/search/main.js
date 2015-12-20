/**
 * @file search main.js
 * @author luwenlong
 */

import React, {Component} from 'react'
import {render} from 'react-dom'
import './index.styl'

class App extends Component {
    
    render() {
        return (
            <div className="search">
                hello search
            </div>
        );
    }
}

export default function init() {
    render(
        <App name="search" />,
        document.getElementById('app')
    );
}
