import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Users from "./containers/Users/Users";
import Albums from "./containers/Albums/Albums";
import Photos from "./containers/Photos/Photos";
import Photo from "./containers/Photo/Photo";

class App extends Component {    

    render() {

        return (
            <div className="App">
                <Route path="/" exact component={Users} />
                <Route path="/:id/albums" exact component={Albums} /> 
                <Route path="/:id/albums/:albumId" exact component={Photos} />
                <Route path="/:id/albums/:albumId/photo/:photoId" exact component={Photo} /> 
            </div>
        );
    }
}

export default App;
