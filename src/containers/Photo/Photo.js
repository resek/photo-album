import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Spinner from "../../components/Spinner/Spinner";
import classes from './Photo.module.css';
import { Link } from "react-router-dom";

class Photo extends Component {

    state = {
        overlay: true,
    }

    componentDidMount() {
        const store = this.props.Store;
        if(!store.photos.length) {
            store.getPhotos();
        }
        if(!store.users.length) {
            store.getUsers();
        }
        if(!store.albums.length) {
            store.getAlbums();
        }        
    }

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay});
    }

    render() {

        let showPhoto;
        const {users, albums, photos} = this.props.Store;
        
        if(photos.length && users.length && albums.length) {

            const {id, albumId, photoId}  = this.props.match.params;

            const album = albums.filter(album => album.id === Number(albumId));
            const user = users.filter(user => user.id === Number(id));
            const photosArr = photos.filter(photo => photo.id === Number(photoId));        
            
            showPhoto = photosArr.map(photo => (
                
                <div onClick={this.toggleOverlay} key={photo.id} className={classes.Photo}>    
                    
                    <img src={photo.url} alt=""/>
                    
                    {this.state.overlay ? 
                        <div className={classes.Overlay}>
                            <p>Title: {photo.title}</p>
                            <p>Album: {album[0].title}</p>
                            <div>
                                <p>User: {user[0].name}</p>
                                <Link className={classes.Link} to={`/${id}/albums/${albumId}`}><button>See album</button></Link>
                            </div>                            
                        </div> 
                    : null}                    
                </div> 
            ));  
        } 
        else {
            showPhoto = (<Spinner />)
        }
    
        return (
            <>
                {showPhoto}
            </>              
        )
    }      
}

export default inject("Store")(observer(Photo));