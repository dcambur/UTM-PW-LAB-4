import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {landing, routes} from "../utils/constants";
import {useNavigate} from "react-router-dom";


const cards = [];

const theme = createTheme();

export default function Landing() {
    const navigate = useNavigate()

    const handleClick = (route) => navigate(route)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {landing.title}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {landing.body}
                        </Typography>
                        <Stack
                            sx={{pt: 4}}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="outlined" color={"success"} onClick={() => handleClick(routes.quiz.list)}>Quiz List</Button>
                            <Button variant="outlined" color={"success"} onClick={() => handleClick(routes.quiz.create)}>Create Quiz</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <p>Hi</p>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}