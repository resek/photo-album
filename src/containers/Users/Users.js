import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Users extends Component { 

    componentDidMount() {       
        this.props.Store.getUsers();
    }

    render() {
        const users = this.props.Store.users.map(user => {
            return (
                <div key={user.id}>
                    <p>{user.name} - {user.username}</p>
                    <button onClick={() => {
                        this.props.Store.getAlbums(user.id); 
                        this.props.history.push("/albums")}}>See albums
                    </button>
                </div>
            )    
        });
    
        return (
            <div>
                {users}
            </div>              
        )
    }      
}

export default inject("Store")(observer(Users));