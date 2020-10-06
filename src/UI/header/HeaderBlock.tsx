import React, {CSSProperties} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../BLL/store';
import {LogOut} from '../../BLL/AuthReducer';
import {AppBar, Button, IconButton, Typography, makeStyles, Theme, createStyles} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import {Menu} from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        userName:{
            marginRight: 10
        }
    }),
);

export const HeaderBlock = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const User = useSelector<AppStateType, string>(state => state.auth.login)
    const dispatch = useDispatch();


    let onLogOutClick = () => dispatch(LogOut())

    const classes = useStyles();

    return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>

                        {
                            isAuth ?
                                <>
                                    <span className={classes.userName}>{User}</span>
                                    <Button  color="inherit" onClick={onLogOutClick}>LOGOUT</Button>
                                </>
                                :
                                <Button color="inherit"><NavLink to={'/login'}>LOGIN</NavLink></Button>
                                    }
                    </Toolbar>
                </AppBar>
            </div>
    )
}

