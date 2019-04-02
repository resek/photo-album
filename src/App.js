import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Users from "./containers/Users/Users";
import Albums from "./containers/Albums/Albums";

class App extends Component {    

    render() {

        return (
            <div className="App">
                <Route path="/albums" component={Albums} />
                <Route path="/" exact component={Users} />
            </div>
        );
    }
}

export default App;
