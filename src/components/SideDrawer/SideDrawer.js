import React from "react";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

const SideDrawer = inject("Store")(observer((props) => {
    
    const store = props.Store;

    return (
        <>
            <Drawer transitionDuration={300} open={store.drawerOpen} onClose={store.toggleDrawer}>
                <List>
                    <Link to="/" onClick={store.toggleDrawer}>
                        <ListItem button >                        
                                <ListItemText primary="Home - all users" />                       
                        </ListItem>
                    </Link>
                    {props.userId ?
                        <Link to={`/${props.userId}/albums`} onClick={store.toggleDrawer}>
                            <ListItem button >                            
                                <ListItemText primary={`Albums - User ${props.userId}`} />
                            </ListItem>
                        </Link>
                    : null}
                    {props.albumId ?
                        <Link to={`/${props.userId}/albums/${props.albumId}`} onClick={store.toggleDrawer}>
                            <ListItem button >                            
                                <ListItemText primary={`Photos - Album ${props.albumId}`} />
                            </ListItem>
                        </Link>
                    : null}
                </List>
            </Drawer> 
        </>
    )
}));

        

export default SideDrawer;