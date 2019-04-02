import { observable, decorate, configure, runInAction, action } from "mobx";
import axios from "axios";

configure({enforceActions: "observed"});

class Store {
    
    users = [];
    albums = [];

    getUsers = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                runInAction(() => {
                    this.users = response.data;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAlbums = (id) => {
        this.albums = [];      
        axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
            .then(response => {
                runInAction(() => {
                    this.albums = response.data;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

decorate(Store, {
    users: observable,
    albums: observable,
    getUsers: action,
    getAlbums: action
});

export default new Store();