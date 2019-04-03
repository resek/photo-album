import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

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
                    <div key={user.id}>
                        <p>{user.name} - {user.username}</p>
                        <img src={filteredArr[0].thumbnailUrl} alt="thumbnail" />
                        <div><Link to={`/${user.id}/albums`}>See albums</Link></div>     
                    </div>
                )    
            });
        } 
        else {
            users = (<div>Loading...</div>)
        }       
    
        return (
            <div>
                {users}
            </div>              
        )
    }      
}

export default inject("Store")(observer(Users));