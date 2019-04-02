import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

class Users extends Component { 

    componentDidMount() {       
        this.props.Store.getUsers();
    }

    render() {
        const users = this.props.Store.users.map(user => {
            return (
                <div key={user.id}>
                    <p>{user.name} - {user.username}</p>
                    <Link to={`/${user.id}/albums`}>See albums</Link>
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