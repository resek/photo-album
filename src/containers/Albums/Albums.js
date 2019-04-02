import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

class Albums extends Component {

    componentDidMount() {        
        if(localStorage.userID_p_a) {
            const id = JSON.parse(localStorage.getItem('userID_p_a'));
            this.props.Store.getAlbums(id);
        }
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