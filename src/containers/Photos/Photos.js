import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

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
                        <img src={photo.thumbnailUrl} alt="thumbnail"/>
                        <div><Link to={`/${userId}/albums/${albumId}/photo/${photo.id}`}>See photo</Link></div>
                    </div>                
                ))               
        } 
        else {
            photos = (<Spinner />)
        }
    
        return (
            <div>
                {photos}
            </div>              
        )
    }      
}

export default inject("Store")(observer(Photos));