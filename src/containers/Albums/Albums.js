import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

class Albums extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.Store.getAlbums(id);
    }
    
    render() {
        const albums = this.props.Store.albums.map(album => {
            return (
                <div key={album.id}>{album.title}</div>
            )
        });    
    
        return (
            <div>
                {albums}
            </div>              
        )
    }    
}

export default inject("Store")(observer(Albums));