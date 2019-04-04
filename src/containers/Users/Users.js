import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import classes from './Users.module.css';
import Button from '@material-ui/core/Button';

class Users extends Component { 

    componentDidMount() {
        if(!this.props.Store.users.length) {
            this.props.Store.getUsers();
        } 
        if(!this.props.Store.photos.length) {
            this.props.Store.getPhotos();
        }  
    }

    render() {

        let users;

        if(this.props.Store.users.length && this.props.Store.photos.length) {
            
            users = this.props.Store.users.map(user => {
                
                const filteredArr = this.props.Store.photos.filter(photo => 
                    photo.albumId === user.id * 10).slice(0,1);
                
                return (                                          
                    <Card key={user.id} className={classes.Card}>
                        <CardContent className={classes.Content}>
                            <p><b>Author:</b> {user.name}</p>
                            <p><b>Username:</b> {user.username}</p>
                            <Button
                                size="small"
                                color="primary" 
                                variant="contained">
                                <Link className={classes.Link} to={`/${user.id}/albums`}>See albums</Link>
                            </Button>
                        </CardContent>
                        <CardMedia 
                            className={classes.CardMedia} 
                            image={filteredArr[0].thumbnailUrl}/>                        
                    </Card>                    
                )    
            });
        } 
        else {
            users = (<Spinner />)
        }       
    
        return (
            <div>
                {users}
            </div>              
        )
    }      
}

export default inject("Store")(observer(Users));