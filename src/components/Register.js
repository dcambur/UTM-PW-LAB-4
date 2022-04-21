import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch} from 'react-redux'
import {userLogin} from '../store/slices/userSlice'
import {fetchURI, token} from "../utils/constants";



export default function Register() {

    const dispatcher = useDispatch();

    const setUser = (e, id) => {
        return {
            id: id,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            isLogged: true
        }
    }

    const handleSubmit = (e) => {
        const axios = require('axios').default
        axios.post(fetchURI.user, {
            data: {
                name: e.target.firstName.value,
                surname: e.target.lastName.value
            }
        }, {
            headers: {
                "X-Access-Token": token
            }})
            .then((response) => {
                const user = setUser(e, response.data.id)
                dispatcher(userLogin(user))
            }).catch((err) => {
            console.log(err);
        })
        e.preventDefault()
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'teal'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstname"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastname"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, bgcolor: "teal"}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent={"center"}>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}