import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Navbar from "../../components/Navbar/Navbar";
import classes from './Albums.module.css';
import SideDrawer from "../../components/SideDrawer/SideDrawer";

class Albums extends Component {

    componentDidMount() {
        const store = this.props.Store;
        window.scrollTo(0, 0);      
        if(!store.albums.length) {
            store.getAlbums();
        } 
        if (!store.photos.length) {           
            store.getPhotos();
        }        
    }
    
    render() {

        let showAlbums;
        const userId = this.props.match.params.id;
        const {albums, photos} = this.props.Store;

        if(albums.length && photos.length) {
            
            const userAlbums = albums.filter(album => 
                album.userId === Number(userId));                
            
            showAlbums = userAlbums.map(album => {                
                
                const filteredArr = photos.filter(photo => 
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
            showAlbums = (<Spinner />)
        }
    
        return (
            <>            
            <Navbar />
            <SideDrawer userId={userId}/>
            <div className={classes.Breadcrumbs}>
                <Link to="/">Home</Link> / Albums - User {userId}
            </div>
            {showAlbums}
            </>              
        )
    }    
}

export default inject("Store")(observer(Albums));