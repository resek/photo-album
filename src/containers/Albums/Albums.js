import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Navbar from "../../components/Navbar/Navbar";
import classes from './Albums.module.css';

class Albums extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);      
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
                    <div key={album.id} className={classes.Album}>                    
                        <Link to={`/${userId}/albums/${album.id}`}>
                            <Card className={classes.Card} >
                                
                                <CardContent className={classes.Content}>
                                    <p><b>Album title:</b> {album.title.substring(0, 38)}</p>
                                </CardContent>
                                
                                {filteredArr.map(photo => 
                                <CardMedia className={classes.CardMedia} key={photo.id} image={photo.thumbnailUrl} />)}
                                            
                            </Card>
                        </Link>
                    </div>
                )
            });
        }  
        else {
            albums = (<Spinner />)
        }
    
        return (
            <>
            <Navbar />
            {albums}
            </>              
        )
    }    
}

export default inject("Store")(observer(Albums));