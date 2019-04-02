import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter }  from "react-router-dom";
import { Provider } from "mobx-react";
import Store from "./stores/Store";

const app = (
    <Provider Store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>  
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
