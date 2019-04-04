import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Spinner from "../../components/Spinner/Spinner";

class Photo extends Component {

    componentDidMount() {
        if(!this.props.Store.photos.length) {
            this.props.Store.getPhotos();
        }        
    }

    render() {

        let photo;
        
        if(this.props.Store.photos.length) {

            const photoId = this.props.match.params.photoId;
            const filteredArr = this.props.Store.photos.filter(photo => 
                photo.id === Number(photoId));        
            
            photo = filteredArr.map(photo => 
                <img key={photo.id} src={photo.url} alt="thumbnail"/>);
        } 
        else {
            photo = (<Spinner />)
        }
    
        return (
            <div>
                {photo}
            </div>              
        )
    }      
}

export default inject("Store")(observer(Photo));