import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Navbar from "../../components/Navbar/Navbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import classes from './Users.module.css';

class Users extends Component { 

    componentDidMount() {
        const store = this.props.Store;
        if(!store.users.length) {
            store.getUsers();
        } 
        if(!store.photos.length) {
            store.getPhotos();
        }  
    }

    render() {

        let showUsers;
        const {users, photos} = this.props.Store;

        if(users.length && photos.length) {
            
            showUsers = users.map(user => {
                
                const filteredArr = photos.filter(photo => 
                    photo.albumId === user.id * 10).slice(0,1);
                
                return (
                    <div key={user.id} className={classes.User}>                   
                        <Link to={`/${user.id}/albums`}>
                            <Card className={classes.Card}>
                                <CardContent className={classes.Content}>
                                    <p><b>Author:</b> {user.name}</p>
                                    <p><b>Username:</b> {user.username}</p>
                                </CardContent>
                                <CardMedia 
                                    className={classes.CardMedia} 
                                    image={filteredArr[0].thumbnailUrl}/>
                            </Card>                         
                        </Link>
                    </div>                    
                )    
            });
        } 
        else {
            showUsers = (<Spinner />)
        }       
    
        return (
            <>
            <Navbar />
            <SideDrawer />
            {showUsers}
            </>              
        )
    }      
}

export default inject("Store")(observer(Users));