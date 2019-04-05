import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import Spinner from "../../components/Spinner/Spinner";
import classes from './Photo.module.css';

class Photo extends Component {

    state = {
        overlay: true
    }

    componentDidMount() {
        if(!this.props.Store.photos.length) {
            this.props.Store.getPhotos();
        }        
    }

    toggleOverlay = () => {
        this.setState({overlay: !this.state.overlay})
    }

    render() {

        let photo;
        
        if(this.props.Store.photos.length) {

            const photoId = this.props.match.params.photoId;
            const filteredArr = this.props.Store.photos.filter(photo => 
                photo.id === Number(photoId));        
            
            photo = filteredArr.map(photo => (
                <div 
                    onClick={this.toggleOverlay} 
                    key={photo.id} 
                    className={classes.Photo}>
                    
                    <img src={photo.url} alt="thumbnail"/>
                    {this.state.overlay ? <div className={classes.Overlay}></div> 
                    : null }
                </div> 
            ))  
        } 
        else {
            photo = (<Spinner />)
        }
    
        return (
            <>
                {photo}
            </>              
        )
    }      
}

export default inject("Store")(observer(Photo));