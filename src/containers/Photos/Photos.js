import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
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
        const {albumId, id} = this.props.match.params;
        
        if(this.props.Store.photos.length) {
            
            const filteredArr = this.props.Store.photos.filter(photo => 
                photo.albumId === Number(albumId));
        
            photos = filteredArr.map(photo => (
                <div key={photo.id}>                
                    <Link to={`/${id}/albums/${albumId}/photo/${photo.id}`}>
                        <div className={classes.Photo} >
                            <img src={photo.thumbnailUrl} alt="" />
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
            <SideDrawer userId={id} albumId={albumId}/>
            <div className={classes.Breadcrumbs}>
                <Link to="/">Home</Link> / <Link to={`/${id}/albums`}>Albums - User {id}</Link> / Photos - Album {albumId}
            </div>
            <div className={classes.Photos}>
                {photos}
            </div>
            </>             
        )
    }      
}

export default inject("Store")(observer(Photos));