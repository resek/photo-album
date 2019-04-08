import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Spinner from "../../components/Spinner/Spinner";
import classes from './Photo.module.css';
import { Link } from "react-router-dom";

class Photo extends Component {

    state = {
        overlay: false,
    }

    componentDidMount() {
        if(!this.props.Store.photos.length) {
            this.props.Store.getPhotos();
        }
        if(!this.props.Store.users.length) {
            this.props.Store.getUsers();
        }
        if(!this.props.Store.albums.length) {
            this.props.Store.getAlbums();
        }        
    }

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay})
    }

    render() {

        let showPhoto;        
        
        if(this.props.Store.photos.length && this.props.Store.users.length && this.props.Store.albums.length) {

            const userId  = this.props.match.params.id;
            const albumId = this.props.match.params.albumId;
            const photoId = this.props.match.params.photoId;

            const album = this.props.Store.albums.filter(album =>
                album.id === Number(albumId));

            const user = this.props.Store.users.filter(user =>
                user.id === Number(userId));

            const photos = this.props.Store.photos.filter(photo => 
                photo.id === Number(photoId));        
            
            showPhoto = photos.map(photo => (
                
                <div onClick={this.toggleOverlay} key={photo.id} className={classes.Photo}>    
                    
                    <img src={photo.url} alt=""/>
                    
                    {this.state.overlay ? 
                        <div className={classes.Overlay}>
                            <p>Title: {photo.title}</p>
                            <p>Album: {album[0].title}</p>
                            <div>
                                <p>User: {user[0].name}</p>
                                <Link className={classes.Link} to={`/${userId}/albums/${albumId}`}><button>See album</button></Link>
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