import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import {Box} from "@mui/material";

export default function Copyright(props) {
    return (
        <Box sx={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center"
        }}>
            <Typography variant="body2" color="text.secondary" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Quiz App - Cambur Dumitru
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}