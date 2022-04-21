import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useState} from "react";

export default function Player(props) {
    const [audio] = useState(new Audio(props.src))
    const [isPlaying, setIsPlaying] = useState(false)

    const musicPlay = () => {

        if (!isPlaying) {
            audio.play().then(() => {setIsPlaying(false)})
            setIsPlaying(true)
        }
        else {
            audio.pause()
            setIsPlaying(false)
        }


    }


    return (
        <Card sx={{
            display: 'flex', left: "0",
            bottom: "0",
            position: "fixed",
            zIndex: 100

        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                        Music
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        source:{props.src}
                    </Typography>
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon onClick={musicPlay} sx={{height: 38, width: 38}}/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}