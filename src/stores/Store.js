import { observable, decorate, configure, runInAction, action } from "mobx";
import axios from "axios";

configure({enforceActions: "observed"});

class Store {
    
    users = [];
    photos = [];
    albums = [];

    getUsers = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            runInAction(() => {
                this.users = response.data;
            });
        })
        .catch(error => {
            console.log(error);
        });   
    }

    getPhotos = () => {
        axios.get(`https://jsonplaceholder.typicode.com/photos`)
        .then(response => {
            runInAction(() => {
                this.photos = response.data;
            });
        })
        .catch(error => {
            console.log(error);
        });       
    }

    getAlbums = () => {        
        this.albums = [];    
        axios.get(`https://jsonplaceholder.typicode.com/albums`)
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
    photos: observable,
    getUsers: action,
    getAlbums: action,
    getPhotos: action,
});

export default new Store();