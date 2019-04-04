import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Navbar.module.css';

const Navbar = () => {

    return (
        <div className={classes.Navbar}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => alert("icon")}>
                        <MenuIcon />   
                    </IconButton>
                    <h3>Photo album app</h3>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;