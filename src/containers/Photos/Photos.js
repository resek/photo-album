import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Photos.module.css";

class Photos extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        if(!this.props.Store.photos.length) {
            this.props.Store.getPhotos();
        }       
    }

    render() {

        let photos;
        
        if(this.props.Store.photos.length) {

            const albumId = this.props.match.params.albumId;
            const userId = this.props.match.params.id;
            const filteredArr = this.props.Store.photos.filter(photo => 
                photo.albumId === Number(albumId));
        
            photos = filteredArr.map(photo => (
                <div key={photo.id}>                
                    <Link to={`/${userId}/albums/${albumId}/photo/${photo.id}`}>
                        <div className={classes.Photo} >
                            <img src={photo.thumbnailUrl} alt="thumbnail" />
                            <div className={classes.Title}><p>{photo.title.substring(0,32)}</p></div>
                        </div>
                    </Link>
                </div>                
            ))               
        } 
        else {
            photos = (<div className={classes.Spinner}><Spinner /></div>)
        }
    
        return (
            <>
            <Navbar />
            <div className={classes.Photos}>
                {photos}
            </div>
            </>             
        )
    }      
}

export default inject("Store")(observer(Photos));