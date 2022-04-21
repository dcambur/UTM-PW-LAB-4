import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux'
import {userLogout} from "../store/slices/userSlice";
import {useState} from "react";
import {fetchURI, routes, token} from "../utils/constants";
import {useNavigate} from 'react-router-dom'

const DELETE = "DELETE"
const LOGOUT = "LOGOUT"
const loginPages = [
    {name: "About", id: 1, route: routes.landing},
    {name: "Quiz List", id: 2, route: routes.quiz.list},
    {name: "Create Quiz", id: 3, route: routes.quiz.create}
]

const settings = [
    {id: 2, name: "Logout", action: LOGOUT},
    {id: 1, name: "Delete User", action: DELETE}]

const Navigation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()

    const deleteUser = () => {
        const axios = require('axios').default
        axios.delete(fetchURI.user + user.id, {
            headers: {
                "X-Access-Token": token
            }
        })
            .then(() => {
                dispatch(userLogout())
                }
            ).catch((err) => {
            console.log(err);
        })
    }
    const handleUserMenu = (action) => {
        if (action === LOGOUT) {
            dispatch(userLogout());
        } else if (action === DELETE) {
            deleteUser();
        }
    }

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleLinkClick = (route) => navigate(route)


    return (
        <AppBar position="static" sx={{bgcolor: "teal"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        disableElevation={true}
                        disableRipple={true}
                        variant="h6"
                        component="div"
                        sx={{mr: 2, display: {xs: 'flex', md: 'flex'}}}
                    >
                        Brain.org
                    </Button>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        {user.isLogged && loginPages.map((page) => (
                            <Button
                                key={page.id}
                                sx={{my: 2, color: 'white', display: 'block'}}
                                onClick={() => handleLinkClick(page.route)}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {user.isLogged && <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0, color: "inherit"}}>
                                <Avatar
                                    sx={{border: '0.1px solid lightgray'}}>{user.firstName[0].toUpperCase()}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"
                                                onClick={() => handleUserMenu(setting.action)}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navigation;