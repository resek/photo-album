import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import { Link } from "react-router-dom";

class Albums extends Component {

    componentDidMount() {      
        if(!this.props.Store.albums.length) {
            this.props.Store.getAlbums();
        } 
        if (!this.props.Store.photos.length) {           
            this.props.Store.getPhotos();
        }        
    }
    
    render() {

        let albums;

        if(this.props.Store.albums.length && this.props.Store.photos.length) {

            const userId = this.props.match.params.id;
            const userAlbums = this.props.Store.albums.filter(album => 
                album.userId === Number(userId));
            
            albums = userAlbums.map(album => {                
                
                const filteredArr = this.props.Store.photos.filter(photo => 
                    photo.albumId === album.id).slice(0, 3);
                
                return (
                    <div key={album.id}>
                        <p>Title: {album.title}</p>
                        <p>AlbumID: {album.id}</p>
                        <p>UserID: {album.userId}</p>
                        {filteredArr.map(photo => <img key={photo.id} src={photo.thumbnailUrl} alt="thumbnail" />)}
                        <div><Link to={`/${userId}/albums/${album.id}`}>See photos</Link></div>
                    </div>
                )
            });
        }  
        else {
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