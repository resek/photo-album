import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

class Albums extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.Store.getAlbums(id);
        this.props.Store.getPhotos();
    }
    
    render() {

        let albums;

        if(this.props.Store.albums.length && this.props.Store.photos.length) {
            albums = this.props.Store.albums.map(album => {
                
                const filteredArr = this.props.Store.photos.filter(photo => 
                    photo.albumId === album.id).slice(0, 3);
                
                    return (
                        <div key={album.id}>
                            <p>Title: {album.title}</p>
                            <p>AlbumID: {album.id}</p>
                            <p>UserID: {album.userId}</p>
                            {filteredArr.map(photo => <img key={photo.id} src={photo.thumbnailUrl} alt="thumbnail" />)}
                        </div>
                )
            });
        }  else {
            albums = (<div>Loading...</div>)
        }           
    
        return (
            <div>
                {albums}
            </div>              
        )
    }    
}

export default inject("Store")(observer(Albums));