import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch} from 'react-redux'
import {userLogin} from '../store/slices/userSlice'
import {fetchURI, token} from "../utils/constants";

const theme = createTheme();

export default function Login() {
    const dispatcher = useDispatch()

    const setUser = (resp) => {
        return {
            id: resp.id,
            firstName: resp.name,
            lastName: resp.surname,
            isLogged: true
        }
    }

    const login = (e) => {
        const axios = require('axios').default
        axios.get(fetchURI.user, {
            headers: {
                "X-Access-Token": token
            }
        })
            .then((response) => {
                for (let id in response.data) {
                    const reqUser = response.data[id]

                    if (reqUser.name === e.target.firstName.value && reqUser.surname === e.target.lastName.value) {
                        const user = setUser(reqUser)
                        dispatcher(userLogin(user))
                        break
                    }
                }
            }).catch((err) => {
            console.log(err);
        })
        e.preventDefault()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(e)
    };

    return (
        <ThemeProvider theme={theme}>
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
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, bgcolor: "teal"}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}